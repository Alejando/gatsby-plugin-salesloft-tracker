---
name: Integrating Zoom in my Rails Application
date: "2019-01-11"
image: ./rails_intergrate_zoom.png
tags:
  -
author: Luis Fer Cuevas
---
Zoom is a communication app that allows us to have meetings through the internet. It comes with a collection of tools such as video-conferencing, screen sharing, meeting management, and more, while being easy to use.

All the functionality that Zoom provides is an essential part of the work done between collaborative teams, everything from daily meetings between a team to communicating with people outside of it.

Given all the features that Zoom provides, maybe you, like us, want to integrate it to your own Rails app to benefit from this amazing app. Here we are going to talk about our experience:
* How we integrated Zoom
* Our goal
* How to [register as a Zoom developer](https://developer.zoom.us/), [Zoom API v1 consumer](https://zoom.github.io/api-v1/) and [Zoom API v2 consumer](https://zoom.github.io/api-v1/)
* Tools that can make integration easier.
Let's go!

## Defining the Scene
It all began when we needed to manage all the meetings in Zoom from our Rails app. The first step is to visit the Zoom.us page and register as developer. You'll need a paid account, so if you don't have an account already you have to register first and create a new account. If you already have an account, purchase the upgrade to get all the access you need for the API.

Now, this is where it all becomes a little tricky because, right now, Zoom is migrating their developers tools from the [developers site](https://developer.zoom.us/) to their [market place](https://marketplace.zoom.us/). Visit the developers page and go to your account, fill all the information needed about your app and get ==> your (your what?) <==. Now get your credentials in the tab under the name of 'API'.

Now we'll explain the APIs. Zoom provides two versions, [version 1](https://zoom.github.io/api-v1/) is no longer supported, but it is still available and has a lot of features. [Version 2](https://zoom.github.io/api-v2/) is supported and provides JWT authentication. The advantage with the API V1 is that in combination with the [gem zoomus](https://github.com/mllocs/zoomus) all that functionality is available and makes the connections for us. Then we have to make a service and a controller and get it all from the API.

You need to read the documentation for both and decide which one is more appropriate for your needs.

## Integrating Zoom with the Ruby gem `zoomus`
W decided to use the gem and connect to V1 because it has all the functionality we need for our app, it allows us to manage meetings and, in the future, we could get the recordings too.

Installing the gem is pretty easy, just add `gem 'zoomus'` to your gemfile.  For the connections to the API you need to set 3 environment variables `ZOOM_US_USER_EMAIL`, `ZOOM_US_API_KEY` and  `ZOOM_US_API_SECRET ` and then create a Zoom initializer:

```ruby
require 'zoomus'
Zoomus.configure do |c|
  c.api_key = ENV['ZOOM_US_API_KEY']
  c.api_secret = ENV['ZOOM_US_API_SECRET']
end
```


By default the API sends the meetings as a hash (or an array of hashes), but we wanted to convert the hashes into objects, because that way we can easily extend the functionality of the class. That's why we created our Meeting class inside a Zoom module.

```ruby
module Zoom
  class Meeting
    attr_reader :start_time, :topic, :duration, :timezone, :id, :type, :join_url

    def initialize(attributes = {})
      attributes.each { |name, value| instance_variable_set("@#{name}", value) }
    end
  end
end
```

The Zoom::Meeting class comes with the methods `meeting_update`, `meeting_create`, `meeting_list`, `meeting_get` and `meeting_delete`. The next step is to define our meetings service. That can also be done in a module:

==> don't rescue Exception becuause that is any error and is not a good practice, you should do `rescue StandardError` <==

```ruby
require 'zoomus'

module Zoom
  class MeetingService

    def update(meeting_params)
      begin
        zoomus_client.meeting_update(merge_params(meeting_params))
      rescue Exception => e
        { error: e.message }
      end
    end

    def create(meeting_params)
      begin
        zoomus_client.meeting_create(merge_params(meeting_params))
      rescue Exception => e
        { error: e.message }
      end
    end

    def get_all
      begin
        meetings = zoomus_client.meeting_list(host_id: user_id)['meetings']
        meetings.map do |obj|
          Zoom::Meeting.new(obj)
        end
      rescue Exception => e
      end
    end

    def get_by_id(id)
      Zoom::Meeting.new(zoomus_client.meeting_get({ host_id: user_id, id: id }))
    end

    def delete(id)
      zoomus_client.meeting_delete({ host_id: user_id, id: id })
    end

    private
    def zoomus_client
      @instance ||= Zoomus.new
    end

    def merge_params(params)
      params.merge({
        host_id: user_id,
        start_time: process_meeting_date(params['start_time'])
      })
    end

    def process_meeting_date(the_date)
      Time.parse(the_date).strftime("%Y-%m-%dT%H:%M:%SZ") if the_date.present?
    end

    def user_id
      @user ||= zoomus_client.user_getbyemail(email: ENV['ZOOM_US_USER_EMAIL'])['id']
    end
  end
end
```

Now with all these methods available we are ready to create our controller. Let's see how we can make index and create methods:

```ruby
class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]

  def index
    @meetings = meeting_service.get_all
  end

  def create
    meeting = meeting_service.create(meeting_params)

    if meeting[:error].present?
      flash[:error] = "Error : #{meeting[:error]}"
      redirect_to action: 'index'
    else
      flash[:success] = 'Success'
      redirect_to action: 'show', id: meeting['id']
    end
  end

  private
  def meeting_params
    params.permit(:start_time, :topic, :duration, :timezone, :id, :type).to_h
  end

  def set_meeting
    @meeting = meeting_service.get_by_id(params[:id])
  end

  def meeting_service
    @service ||= Zoom::MeetingService.new
  end
end
```

Now it's almost time to start building the views, but before that it's important to note that the zoom API has a specific time zones list. It's worth mentioning that ActiveSupport time-zones aren't compatible with the API (the ID for each time zone is different). Our recommendation here is to create your own time zones service where you can read a CSV file with all the time zones and their keys.

Create the views and you're ready to go!!

## Closing Thoughts
We can easily integrate Zoom using the Ruby gem Zoomus. We encourage you to use it if it suits your needs because it is very easy to use and quick to implement. The documentation is clear and it list most of the functionality of Zoom there. If you want to be up to date with the new changes you can try the APIv2.

## What's Next?
You may want to learn how to manage recordings, and find how to upload the files to another third party app like AWS or so.

We are planning to look into how to implement this functionality using APIv2 in the future. Maybe a Ruby gem for V2 would be great! You will find out in our next post on Zoom integration!
                                                
[Check us out!] (https://densitylabs.io/)
