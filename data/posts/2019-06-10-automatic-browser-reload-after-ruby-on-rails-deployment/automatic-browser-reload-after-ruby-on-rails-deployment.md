---
name: "Automatic browser reload after Ruby-on-Rails deployment"
date: "2019-06-10"
image: "./automatic-browser-reload-after-ruby-on-rails-deployment.jpg"
keywords: ruby-on-rails, rails, ruby, rails-5, action-cable, web-sockets
description: Ruby-on-Rails has integrated WebSockets in a very efficient way with Action Cable into Rails version 5. We can take advantage of this feature to transmit data from our server to the client side and so we can identify when there is a change in our application’s version.
author: Yan Carlos Marin
social_summary: Ruby-on-Rails has integrated WebSockets in a very efficient way with Action Cable into Rails version 5. We can take advantage of this feature to transmit data from our server to the client side and so we can identify when there is a change in our application’s version.
tags:
  - ruby-on-rails
  - rails
  - ruby
  - rails-5
  - action-cable
  - web-sockets
---
Generally, applications we build are made with the idea that a user goes to the site, performs some operations and then leaves. This means [they use our application for 10 or 20 seconds at most](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages). There are specific cases in which the users keep the application open all day in their browsers and without reloading the application for a long period of time.
According to the above, the following questions may arise:

-   What happens if a new important feature is deployed that the client must see?
    
-   Can we ensure users get a critical frontend fix in the app immediately after deployment?
    
-   How do we make sure that our users are seeing the latest version of the application?
    

These were some of the issues facing a project we are building in Density Labs using Ruby-on-Rails as part of our tech stack. A possible solution is to create a function on the client side that would check the deployed version of the code at certain time intervals. That technique is known as polling and although it has been a common approach in the past, there are more efficient techniques.

**So, what's the plan?**

[Ruby-on-Rails](https://guides.rubyonrails.org) has integrated WebSockets in a very efficient way with [Action Cable](https://guides.rubyonrails.org/action_cable_overview.html) into Rails version 5. We can take advantage of this feature to transmit data from our server to the client side and so we can identify when there is a change in our  application’s version. The flow will be as follows:

1.  We’re going to take the current version of our project by using the Git revisions (this one basically names a commit object and it uses what is called an extended SHA-1 syntax).
    
2.  We’ll create an Action Cable channel and we'll send the app's revision through it so that the client gets the revision when it connects.
    
3.  The client must subscribe to the channel to receive the app’s revision which will be compared to its current revision.
    
4.  We will use cookies to store the revision on the client side.
    
5.  If the app’s revision in the client is outdated we will force the browser to reload.
    


**Let’s begin…**

First of all, we’ll create an initializer to get the current revision of the application:

```ruby
# in config/initializers/git_revision.rb

module Git
  REVISION = `SHA1=$(git rev-parse --short HEAD 2> /dev/null); if [ $SHA1 ]; then echo $SHA1; else echo 'unknown'; fi`.chomp
end
```

The next step is to implement Action Cable into our project. If you don’t know how to do it you can see [this post](https://densitylabs.io/blog/implementing-action-cable-and-active-job-in-rails-5) which was written by one of our gurus at Density Labs to get a clearer idea about how to use it.

Now we need to create a channel to notify the clients whenever the app’s version changes after deployment. When we deploy the application every client will re-connect to the application and at that moment they’re going to receive the new app’s revision:

```ruby
# in app/channels/notify_revision_channel.rb

class NotifyRevisionChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'notify_revision_channel'

    notify
  end

  private

  def notify
    ActionCable.server.broadcast(
      'notify_revision_channel',
      current_git_revision: current_revision
    )
  end

  def current_revision
    @current_revision ||= Git::REVISION
  end
end
```

In the subscribed method we are defining the channel that performs the transmission and calls the notify method. So, when a client is connected the notify method will broadcast the app’s revision to channel.

Now that we have the channel and the transmission, we can move forward to the JavaScript client’s changes:

```javascript
// in app/assets/javascripts/channels/notify_revision.js

(function() {
  App.cable.subscriptions.create('NotifyRevisionChannel', {
    connected: function() {
    },
    disconnected: function() {
    },
    received: function(data) {
    }
  });

}).call(this);
```

Here we are creating a subscription to the channel, we have 3 callbacks:

1. _connected:_ will be executed when a client is connected to the channel (NotifyRevisionChannel).

2. _disconnected:_ will be executed when the subscription is closed.

3. _received:_ will be executed when the client receives any transmission from the server.

Finally, let’s use cookies to store the current app’s revision on the client side. We can use the [js-cookie](https://www.npmjs.com/package/js-cookie) package, as follows, or use the Rails gem [js\_cookie\_rails](https://github.com/freego/js_cookie_rails). So, let’s update our code as follows:

```javascript
// in app/assets/javascripts/channels/notify_revision.js

(function() {
  App.cable.subscriptions.create('NotifyRevisionChannel', {
    connected: function() {
    },
    disconnected: function() {
    },
    received: function(data) {
      var currentGitRevision = data.current_git_revision;
      var browserRevision = Cookies.get('current_git_revision');

      if(browserRevision) {
        if(currentGitRevision != browserRevision) {
          Cookies.set('current_git_revision', currentGitRevision);
          location.reload(true);
        }
      }else {
        setCookie('current_git_revision', currentGitRevision);
      }
    }
  });

}).call(this);
```

With the changes above, we can see the client will receive the app’s revision from the server and compare it with the revision it has in the cookie. If these are different then the browser will reload automatically, allowing the users to see the latest version of the application, they will always be up to date.

**Closing thoughts**

Without a doubt, Action Cable is a very powerful and efficient tool. It allows keeping continuous communication between the server and the clients. Also, we can combine Action Cable with other tools to create solid and advanced features that add value to our apps and make them more stable and performant.

If you’d like to start building a project, please [tell us about it!](https://densitylabs.io/contact-us)
