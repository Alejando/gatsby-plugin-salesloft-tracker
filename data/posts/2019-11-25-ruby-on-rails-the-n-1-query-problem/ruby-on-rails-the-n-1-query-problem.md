---
name: "Ruby on Rails: The N+1 query problem"
date: "2019-11-25"
image: ./ruby-on-rails-the-n-1-query-problem.jpg
keywords: "RoR, ruby-on-rails, rails5, n-plus-one-query, eager-loading, eager-loading-in-rails, database, database-problems, performance, performance-issues"
author: Yan Carlos Marin
social_summary: "The N+1 Query is usually the biggest cause of most performance issues, but very few people know about it. Today we are going to unmask it."
tags:
  - ruby-on-rails
  - eager-loading
  - database
  - performance-issues
description: "The N+1 Query is usually the biggest cause of most performance issues, but very few people know about it. Today we are going to unmask it."
---

Ruby on Rails is a framework that allows us to be more productive requiring few configurations and writing complex applications with less code. But if Ruby on Rails is so great, why do many people say "Rails does not scale well"?.  Some times we leave all responsibility for our application to the framework and forget how important good practices are to build quality software. We cannot expect our issues will disappear just because we are using a great tool, we need to remember that a bad implementation is as slow in C as in Ruby.

Normally people start complaining about the scalability of Ruby on Rails when the business begins to grow, this creates more records in the database and our application must strive to consult and manipulate that information. The problem is that if we have a bad approach that effort will take a long time making our application slow and inefficient.

The N+1 query is usually the biggest cause of most performance issues, but very few people know about it. Today we are going to unmask it.

### When does it happen?
It occurs when you load a list of objects and then for each object you make one more query to find an associated object. Let's see how and when this "murderer" of applications works with a little example.

We have 2 connected models:
```ruby
class Singer < ApplicationRecord
  has_many :songs
end
````

```ruby
class Song < ApplicationRecord
  belongs_to :singer
end
```
As you can see, a singer has many songs and a song belongs to a singer. Now, suppose we want to get the songs, then we have a controller to do that:

```ruby
class SongsController < ApplicationController
  def index
    @songs = Song.limit(10)
  end
end
````

If we want to show them in the view, we could write the following code in our view template:	
```ruby
<% @songs.each do |song| %>
  <%= song.name %>
  <%= song.singer.name %>
<% end %>
````

The above code works, but it has a big problem, let's see the log:
```bash
Started GET "/songs" for ::1 at 2019-11-08 14:30:42 -0500
Processing by SongsController#index as HTML
  Rendering songs/index.html.erb within layouts/application
  Song Load (0.1ms)  SELECT  "songs".* FROM "songs" LIMIT ?  [["LIMIT", 10]]
  Singer Load (0.1ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  CACHE Singer Load (0.0ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  CACHE Singer Load (0.0ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  CACHE Singer Load (0.0ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  CACHE Singer Load (0.0ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  CACHE Singer Load (0.0ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  Singer Load (0.1ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 3], ["LIMIT", 1]]
  Singer Load (0.1ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
  Singer Load (0.1ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 4], ["LIMIT", 1]]
  CACHE Singer Load (0.0ms)  SELECT  "singers".* FROM "singers" WHERE "singers"."id" = ? LIMIT ?  [["id", 3], ["LIMIT", 1]]
  Rendered songs/index.html.erb within layouts/application (15.9ms)
Completed 200 OK in 35ms (Views: 31.0ms | ActiveRecord: 1.5ms)
```

There are 11 database queries, 1 query to load the songs and N queries for loading the singer in each iteration. It is very inefficient, what happens if we have 10,000 songs? The application will need to connect to the database 10,001 times, and we have to take in mind that the database connection is not free, each database request generates a performance cost.

### So, how can we identify this issue in our applications?
When we have a small application, identifying and solving this problem is easier, but when our application starts growing, controlling this problem is increasingly difficult. For this reason, there is a gem that helps us combat the N+1 query problem: Bullet. It was designed to help us increase the performance of our application by reducing the number of database queries. Let's install it. 

Add the following to `gemfile` :
```ruby
gem 'bullet', group: 'development'
```

Let's add the configuration to `config/environments/development.rb`:
```ruby
config.after_initialize do
  Bullet.enable = true
  Bullet.rails_logger = true
end
```

    
_You can add more options to Bullet's configuration, as shown in the [documentation](https://github.com/flyerhzm/bullet#configuration)._

Now, when we run the songs query again, the Bullet gem shows us a message in the terminal:
```bash
GET /songs
USE eager loading detected
  Song => [:singer]
  Add to your finder: :includes => [:singer]
```

The above message means we are doing something bad and we have to fix it.

### Solution: The Eager loading
To fix the performance issue, we have to reduce the number of database queries. In Ruby on Rails, the Eager loading is a way to find objects of a certain class and it's related objects using as few queries as possible. See the documentation [here](https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations).

In this case, the solution is very easy, just tell ActiveRecord to include the singers of the loaded songs, for this use the `includes` function:
```ruby
class SongsController < ApplicationController
  def index
    @songs = Song.includes(:singer).limit(10)
  end
end
```

Now the result is the following: 
```bash
Started GET "/songs" for ::1 at 2019-11-08 15:20:45 -0500
Processing by SongsController#index as HTML
  Rendering songs/index.html.erb within layouts/application
  Song Load (0.1ms)  SELECT  "songs".* FROM "songs" LIMIT ?  [["LIMIT", 10]]
  Singer Load (0.1ms)  SELECT "singers".* FROM "singers" WHERE "singers"."id" IN (1, 3, 2, 4)
  Rendered songs/index.html.erb within layouts/application (17.2ms)
Completed 200 OK in 49ms (Views: 44.6ms | ActiveRecord: 1.3ms)
```
As you can see there are only 2 requests to the database. Without a doubt this is more efficient and the Bullet gem is not showing any warning message. We have killed the N+1 query problem.

### Conclusion
Ruby on Rails is friendly and powerful framework that allows us to build applications quickly and easily. If we do not give importance to good development practices and do not take into account relevant things like queries to the database, we are going to have inefficient and non-scalable applications.
	
	
	
