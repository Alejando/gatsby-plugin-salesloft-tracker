---
name: Benefits of WordPress + Docker in a production environment + troubleshooting guide.
date: "2016-05-13"
image: ./dockers.png
description: We love Rails, but WordPress provides a robust solution for our blogging needs. And lately, we have been experimenting with Docker + WordPress.
tags:
  - ruby
  - wordpress
  - docker
  - blogging
author: Federico Ramallo
social_summary: Even though we are a Rails development team, we use WordPress for our blog. We love Rails, but WordPress provides a robust solution for our blogging needs. And lately, we have been experimenting with Docker + WordPress.
---
Hello,

Even though we are a Rails development team, we use WordPress for our blog. We love Rails, but WordPress provides a robust solution for our blogging needs. And lately, we have been experimenting with Docker + WordPress.

## So, why Docker?

There are quite a few straightforward reasons why we use Docker with WordPress, namely:

*   Docker reduces clutter.
*   We can run a couple of Rails applications and WordPress instances on the same server.
*   It helps with version conflict management in Rails apps
*   It allows for the duplication of a production server into staging for testing purposes.

We can “dockerize” an application, run it in our laptops, run tests and then deploy with confidence that it will work. If you are new to Docker, you should read [What is Docker](https://www.docker.com/whatisdocker) and [Dockerizing applications](https://docs.docker.com/userguide/dockerizing). So, the plan is to apply this process to our application. However, I found some issues while building the instances. I would like to share those issues and how I managed to solve them.

## Creating a WordPress instance

There are multiple instances ready to use on the [Docker hub](https://registry.hub.docker.com).

Try a simple [search](https://registry.hub.docker.com/search?q=wordpress). I first tried [this instance](https://registry.hub.docker.com/_/wordpress) but didn’t like the lack of documentation, and that I wasn’t able to save the uploaded files in a persistent volume. Then I tried [this other one](https://registry.hub.docker.com/u/tutum/wordpress) but wasn’t able to modify wp-config.php without some hacking. So, I built [my own](https://github.com/densitylabs/docker-wordpress) WordPress [image](https://github.com/densitylabs/docker-wordpress) instead.

### Dockerfile

This file is responsible for creating the docker instance. You can check the Dockerfile instance [here](https://github.com/densitylabs/docker-wordpress/blob/master/Dockerfile). Let me explain each line, so that it all makes sense.

    FROM framallo/php-fpm

I created a base image [php-fpm](https://registry.hub.docker.com/u/framallo/php-fpm/) that allows you to run any PHP application. It is based on `ubuntu:14.04`.

    ENV DEBIAN_FRONTEND=noninteractive
    RUN apt-get update
    RUN apt-get install -y  curl mysql-client
    RUN rm -rf /var/lib/apt/lists/*

The first line is to avoid mysql to ask for a root user and password. Then I updated the apt-cache and install curl and mysql client. Last, I removed the apt-cache to reduce the instance size.


    ENV wordpress_VERSION 4.1.1
    ENV wordpress_UPSTREAM_VERSION 4.1.1
    ENV wordpress_SHA1 15d38fe6c73121a20e63ccd8070153b89b2de6a9
    ENV DB_NAME wordpress_development
    ENV DB_USER root
    ENV DB_PASS root
    ENV AUTH_KEY            --w,=nO-t>g:EOH>e-ZXs!7x(: W4:}1A2$E?Sn9P>TW-[=:u[nc-eQ<vIi<6|wh
    ENV SECURE_AUTH_KEY     PlM~WQ/9-~V:-3&be`nxuaghz@JyN!]SzVr_]lAM2b?QH(d(|`.z_;1jIE4kY&f+
    ENV LOGGED_IN_KEY       K]6*uCb-m~>zj5C1krtu:>2VT(WlI/Jl5T~Pov2-`r+Zb5s3i6&aIN$*/+k/~sLN
    ENV NONCE_KEY           ~; xvP`h^{Pl9zaD#/!f@M21BAk0#sKg>*P+=1LV+FY+;HNE)%Y`4(Xq|&})fCj^
    ENV AUTH_SALT           A2|G[jvSLB+z dy S/ S>(lLyzxDvJ8(ps1(F%~x]eRD`UHv(h*IDjye+SYV-a;O
    ENV SECURE_AUTH_SALT    9cv/Hy~a;qr]4)i*udy-/$non@_:CU0SIdm-L[WH^k_}s:Jq[)HV,Wu8na<_;ef3
    ENV LOGGED_IN_SALT      {d*4OCrk9x`|cb-4EBK7=ewJ3D]y%z,7mSEd:8?=eP![zD.O`<Uubt-u%@TA+x T
    ENV NONCE_SALT          z6G5thFC]JIW]|ZQIBgZ?zBb^!N#3-Un=)`!Xb/,Yd8[2&}.W{ITu?=PE0oZ,<8^
    ENV WP_RELOCATE true

These are environment variables that you can change when you run the instance. I think is important to provide with sensible defaults that allow you to quickly test the instance without much thought.


    RUN rm /var/www/index.php

The base image php-fpm has an index.php file that allows you to test it out. I removed it to provide WordPress a clean folder.

    RUN curl -o wordpress.tar.gz -SL https://wordpress.org/wordpress-${wordpress_UPSTREAM_VERSION}.tar.gz \
        && echo "$wordpress_SHA1 *wordpress.tar.gz" | sha1sum -c - \
        && tar -xzf wordpress.tar.gz -C /var/ \
        && rm wordpress.tar.gz

This actually installs WordPress. It’s designed to be in one line so that Docker can cache it completely


    RUN cp -r /var/wordpress/* /var/www

Then I copy WordPress to the correct folder.

    ADD wp-config.template.php /var/www/wp-config.template.php

I copy a template to generate wp-config.php. When the instance starts I run the [40_parse_wordpress_config.sh](https://github.com/densitylabs/docker-wordpress/blob/master/40_parse_wordpress_config.sh) init script. I use bash to render the template using ENV variables. For instance, `${DB_NAME}` will be converted to *wordpress_development*. I found the template parser script [here](http://stackoverflow.com/questions/2914220/bash-templating-how-to-build-configuration-files-from-templates-with-bash).

The issue is that PHP doesn’t inherit the environment variables, so I had to modify wp-config.php in order to set all the variables that the application needs.


    RUN chown -R www-data:www-data /var/www
    RUN chmod 755 -R /var/www/

I prepare the files to be accessible by nginx and PHP


    VOLUME /var/www

This line allows you to create persistent storage for the uploaded files and other application changes.

    ADD *.sh /
    RUN chmod +x /*.sh

These lines prepare the init scripts. I add them and set as executable scripts.

    CMD for f in /*.sh; do $f ; done

When the instance starts it will run each init script. The last one is [50_init.sh](https://github.com/densitylabs/docker-php-fpm/blob/master/50_init.sh) from [php-fpm](https://registry.hub.docker.com/u/framallo/php-fpm) which runs nginx and php-fpm. All the previous scripts should execute and stop to allow the init process to work.

## Docker compose

Previously known as [fig](http://www.fig.sh/), [Docker’s Compose](https://docs.docker.com/compose/) allows you to run multiple Docker instances together. Since WordPress requires a database instance, I created a [docker-compose.yml](https://github.com/densitylabs/docker-wordpress/blob/master/docker-compose.yml) file.

```yaml
WordPress:
  build: .
  # image: framallo/php-fpm
  links:
    - db:mysql
  ports:
    - 8080:80
  environment:
    DB_NAME: WordPress_development
    DB_USER: root
    DB_PASS: 12345Abc
```

The “build” attribute is the Dockerfile folder. “Links” allows you to connect it with mysql. “Ports” refers to the exposed ports. The format is <host port>:<instance port>. “Environment” allows you to setup the instance

```yaml
db:
  image: mariadb
  environment:
    MYSQL_ROOT_PASSWORD: 12345Abc
```

This is to run the database. The password in `MYSQL_ROOT_PASSWORD` should be the same as `DB_PASS`

## Creating a data volume

In order to run it in production, you need to save the uploaded files. You can use a data volume for that.

In docker-compose.yml you need to add the following:

```yaml
volumes_from:
  - wordpressdata
```

And add another image to docker-compose.yml:

```yaml
wordpressdata:
  image: framallo/wordpress
  volumes:
    - /var/www
  command: echo 'wordpress data initialized'
```

So every file that is uploaded or modified will be saved in the `wordpressdata` image.

Just be careful when you are cleaning up docker and removing old images because you could delete `wordpressdata`.

## Another nginx instance.

If you run the example docker-compose.yml it will work. However, WordPress will be connected to port 80 and we won’t be able to run another instance. We need to add another nginx to act as a reverse proxy.

I added the following lines to docker-compose.yml:

```yaml
proxy:
  image: framallo/nginx
  links:
    - wordpress
  ports:
    - 80:80
  volumes:
    - sites:/etc/nginx/sites-template
  environment:
    VERBOSE_TEMPLATES: true
```

And removed the ports attribute in WordPress. Now the proxy connects to WordPress using the env variables and can expose multiple applications.

Here’s where we end for now. In conclusion, after having solved the minor issues mentioned above, we found Docker to be a very useful and efficient tool to manage distributed applications. Give it it a try when you can. Let me know if you have any questions about how our instance works, or check out our documentation [here](https://github.com/densitylabs/docker-nginx).

Thanks for reading!

