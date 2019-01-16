---
name: Implementing Action Cable and Active Job in Rails 5
date: "2016-06-09"
image: ./Implementing_Action_Cable.jpg
description: Have you checked Action Cable in Rails 5? It’s a nice addition that integrates WebSockets to Rails. In this post, we'll see how to implement Action Cable with Active Job. Active Job is a framework for declaring jobs.
tags:
  - rails-5
  - action-cable
  - active-job
  - web-sockets
  - rails
  - ruby
author: Tonatiuh Núñez
---
Have you checked Action Cable in Rails 5? It’s a nice addition that integrates WebSockets to Rails. In this post, we'll see how to implement Action Cable with Active Job. Active Job is a framework for declaring jobs.

Let’s say we’re building a Twitter app, we need to add a feature that allows finding the information of a group of users based on a group of ids. The thing is,
 there is a limitation in the Twitter API, it doesn't allow to fetch the data of more than 100 users per request. We need to ensure our app performs when 100 user ids or more are received regardless of the API limit.

## Active Job

With Active Job we can create jobs that can be scheduled using a queue backend such as Sidekiq or Resque. One of the main features of Active Job is that you just need to follow a unique syntax (the one of Active Job), then you can plug any queue backend.

In case you don't know what a queue backend is, it's a library that allows scheduling jobs for running them in background (in a separate process of the app's process). Generally, you will want to send heavy tasks (such as generating a big CVS file based on data in your DB) to the background so that the app's process isn't stuck while waiting for the task to finish.

Some of the benefits we will get by using background jobs in our scenario are:

- The Rails server process won't be busy while requesting the data to the Twitter API. Jobs run in separated processes than the application server process.
- The job processes run in parallel. This is very useful since we need to send a series of requests to the API, sending they in parallel we will finish processing all faster.

Some of the advantages of using Active Job are:

- It comes already bundled in Rails 4 and above.
- We don't need to change the definition of a job if the app's queueing backend changes. Active Job is in charge of connecting to the queue backend.

Here is how we define a job with Active Job:

```ruby
class TheJob < ActiveJob::Base
  queue_as :the_queue

  def perform
    # the job's logic
  end
end
```

Above we can see:

- The job class which needs to inherit from "ActiveJob::Base".
- A call to "queue_as" with a parameter. The parameter corresponds to the queue where we want to assign the job.
- The “perform” method. In this method goes the logic that the job needs to execute.

We schedule a job for background execution with the following call:

```ruby
TheJob.perform_later
```

### Creating the job

Let's define the job in charge of sending a request to the Twitter API to get the information of a group of users based on a group of ids. Create the file app/jobs/find_users_info_job.rb with the following content:

```ruby
class FindUsersInfoJob < ActiveJob::Base
  queue_as :default

  def perform(current_user_id, user_ids)
    fail 'Up to 100 users are supported only.' if user_ids.count > 100
    # the code to send a request to Twitter to get the users info base on the ids
    # ...
  end
end
```

We will schedule the job once per each 100 users we need to fetch from the Twitter API. The job needs to receive a logged in user id, and the ids of the Twitter users.

To schedule the job that we just created we need to run something like:

```ruby
logged_in_user_id = 1
twitter_user_ids = [938484, 239384, 3493421]
FindUsersInfoJob.perform_later(logged_in_user_id, twitter_user_ids)
```

Okay, with the job being executed in the background the "n" times needed we will get the users information. However, since the job is executed in the background, how do we get the users info in the frontend once every job has finished? Here is where Action Cable plays really nice.

## Real-time communication with Action Cable

Action Cable works on top of the WebSocket protocol. The WebSocket protocol allows opening a connection between the server and the browser, allowing them to send and receive messages through such connection. That allows the browser to receive real-time notifications from the server automatically, removing the need to poll the server every time the browser wants to know if there is any new notification (data).

In this post's scenario, we need the frontend to receive a new notification (with the users info) every time any of the jobs has finished fetching the users info.

### The bases

Before going into the code, let's first check the base concepts in Action Cable. The concepts will be better understood with the code later on.

#### Server side

Connections:

- For every connection made between the client and the server, an instance of an Action Cable connection will be created.

Channels:

- A channel encapsulates a logical unit of work, similar to what a controller does in a regular MVC setup.

Streams:

- Streams provide the mechanism by which channels route published content (broadcasts) to its subscribers.

#### Client side

Connection consumer:

- A connection consumer is required to establish a connection to the server.

Subscribers:

- When a "connection consumer" subscribes to a channel then it becomes a subscriber and a connection is created.

### Configuring Action Cable

There is some configuration our Rails 5 app needs to define in order to start sending messages (notifications) through Action Cable.

Set the following code in an initializer,  "config/initializers/action_cable.rb":


```ruby
if Rails.env.development?
  Rails.application.config.action_cable.allowed_request_origins =  ['http://localhost:3000', 'http://127.0.0.1:3000']
end
```

The code above tells Action Cable to permit messages coming from localhost. In other environments, the code above will need to be updated.

Action Cable by default only permits messages coming from the app's process itself (by using the "async" adapter). Active Job jobs run in separate processes than the Rails server process, so we need to update Action Cable's configuration to allow messages coming from other processes. Update the file config/cable.yml to:

```yaml
redis: &redis
  adapter: redis
  url: redis://localhost:6379/1

production: *redis
development: *redis
test:
  adapter: async
```

Next, let's enable Action Cable. Uncomment the following line in the config/routes.rb file:

```ruby
mount ActionCable.server => '/cable'
```

Last, let's add the Action Cable meta tag in our app/views/layouts/application.html.haml. Add the following line in the HTML header:

```haml
= action_cable_meta_tag
```

Which will be converted to the following

```html
<meta name="action-cable-url" content="/cable">
```

The line above, tells the Action Cable subscribers in the frontend the URL of the Action Cable server in the backend.

### The connection

Action Cable can authenticate or reject a connection based on the sender's data.

The class ApplicationCable::Connection located at "app/channels/application_cable/connection.rb" is the place where we need to add the logic to authenticate connections. Open the file, it should have the following content:

```ruby
module ApplicationCable
  class Connection < ActionCable::Connection::Base
  end
end
```

Change it to the following and restart the server (we  need to restart the server every time we modify something in app/channels):

```ruby
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    protected

    def find_verified_user
      user = User.find(cookies.signed[:user_id])
      return user if user
      fail 'User needs to be authenticated.'
    end
  end
end
```

The method "connect" is executed every time a new connection is about to be created. In the code above we're attempting to find a user in the database based on the cookie "user_id", if the user isn't found then the app raises an error, if she is found then it's assigned to the identifier "current_user" (we'll see later why setting "current_user" as an identifier is important).

### The channel

Action Cable sends messages through what it calls channels. We need to create an Action Cable channel that the Active Job processes (the instances of the job we created in the Active Job section) can use to notify the frontend when they finished fetching the user data.

Let's generate a channel with the name "UserInfoChannel":

    $ rails generate channel UserInfoChannel

The command above generates the following files:

    app/channels/user_info_channel.rb
    app/assets/javascripts/channels/user_info.coffee

In the file app/channels/user_info_channel.rb we can set the code to be executed when a client makes a connection to the channel. The file initially has the following content:

```ruby
class UserInfoChannel < ApplicationCable::Channel
  def subscribed
  end
  def unsubscribed
  end
end
```

In the code above the "subscribed" method is executed when a client makes a connection to the server, whereas the "unsubscribed" method is executed when the client disconnects.

We need to create a stream when the client subscribes to the channel. The stream will allow data to travel through the connection. Let's modify the "subscribed" method to set the stream:

```ruby
def subscribed
  stream_from "user_info_channel_#{current_user.id}"
end
```

What we're saying above is when the client connects to the channel set the connection with the stream "user_info_channel_#{current_user.id}".

In the code we can access the "current_user" variable, that's because we set that identifier in the app/channels/application_cable/connection.rb file (when we were configuring Action Cable above).

### The connection consumer

A connection consumer is required to create subscriptions in the client side. Let's enable the code that creates the connection consumer. Go to the file
app/assets/javascripts/cable.coffee and set the following content:

```
#= require action_cable
#= require_self

@App ||= {}
App.cable = ActionCable.createConsumer()
App.subscriptions = [];
```

The code above works together with the "action-cable-url" meta tag that we declared some steps above.

### The subscription

If you recall, when we generated the channel files with the command

    $ rails generate channel UserInfoChannel

The file app/assets/javascripts/channels/user_info.coffee was generated, that file has the code to initialize the subscription in the frontend. Let's see its content:

```coffeescript
App.cable.subscriptions.create "UserInfoChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
```

There is a subscription to the "UserInfoChannel" being created in the code above. Also, the functions to be executed when the connection is created or destroyed, and when the content is received are being declared.

We have set the bases in the backend and the frontend to perform real-time communication, now let's send messages from Active Job to Action Cable.

### Combining all: sending data through Action Cable

Let's modify the job that we created in the Active Job section, we need it to broadcast the users data when finishes fetching it from the Twitter API. We need to set app/jobs/find_users_info_job.rb to:

```ruby
class FindUsersInfoJob < ActiveJob::Base
  queue_as :default

  def perform(current_user_id, user_ids)
    fail 'Up to 100 users are supported only.' if user_ids.count > 100
    MyTwitterClass.get_users_info(current_user_id, user_ids)
  end
end
```

We need to add the necessary code to broadcast the users data with Action Cable. Let’s update it to:

```ruby
class FindUsersInfoJob < ActiveJob::Base
 queue_as :default

 def perform(current_user_id, user_ids)
   fail 'Up to 100 users are supported only.' if user_ids.count > 100

   stream_id = "user_info_channel_#{current_user_id}"
   users_info = MyTwitterClass.get_users_info(current_user_id, user_ids)

   ActionCable.server.broadcast(stream_id, users_info: users_info)
 end
end
```

In the code above, we are telling Action Cable to broadcast a message to the corresponding stream, with the users info as the body of the message.

We need to modify the "received" function in the subscription, so that when the message arrives we take the users data and append it to the DOM:

```coffeescript
...
received: (data) ->
  for user in data['users']
    do (user) ->
      $('body').append(user['screen_name'])
      $('body').append("<img src='"+ user['profile_image_url'] + "' />")
...
```

In the code above we’re appending to the body every user's screen name and profile image that is fetched by Active Job and sent to Action Cable.

That’s it, when any of the jobs finishes fetching users info from the Twitter API, they will broadcast a message with the info, the frontend will get the message and render it.

## Conclusion

Active Job and Action Cable seem to make a good fit. It seems to me also that their implementation is simple once you know their structure. Last, is good that there is now a "native" way for handling Web Sockets in Rails, I'm curious about how Action Cable will grow in the future.

So, what do you think? Do you like Active Job and Action Cable? Have you already implemented them? How?

Would you like to learn more about these technologies? We can schedule a pairing session and setup some challenge to work on. If you want you can contact me at tonatiuh@densitylabs.io.

