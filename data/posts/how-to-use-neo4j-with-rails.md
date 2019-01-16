---
name: How To Use Neo4j With Rails
date: "2017-09-12"
image: ./how-to-use-neo4j-with-rails-picture.png
description: This data model allows you to avoid performance issues when you need to join multiple tables. Instead of rows you can use a more expressive and natural data model. Also the queries are faster to execute and easier to build on complex data relationships
tags:
  - neo4j
  - rails
  - ruby
author: Federico Ramallo
---
## WHAT IS A GRAPHDB

Graph databases are a new type of databases where relationships are first-class citizens in this data model. In this databases you store nodes and relations instead of records. Also you can store a label (or type) and attributes. Attributes are keys and values. Worth to mention that the relations have a direction, however you can chose to use or ignore it.

For instance you can have nodes with the label Person and Movie. and you can create a relationship from one person into a movie. The relationship type would be the wether if the person acted on the movie or directed the movie

The underlying storage can be native graph storage that is optimized and designed for storing and managing graphs. Or you can serialize the graph data into a relational database or an object oriented database. The first one has performance benefits but has a learning curve for sysadmins. The latter allows you to leverage your existing infrastructure using well known tools.

## WHY GRAPHDB

This data model allows you to avoid performance issues when you need to join multiple tables. Instead of rows you can use a more expressive and natural data model. Also the queries are faster to execute and easier to build on complex data relationships

## WHAT IS NEO4J AND NEO4JRB

I decided to use neo4j because I think is the best engine out there today. neo4j is a native graph storage with a native processing engine. This means is fast and the most innovative graph database

Then there is neo4j.rb which is an active model wrapper for the Neo4j Graph Database for Ruby Something like an ORM similar to ActiveRecord.

## MOVIES SAMPLE DATA

I am using the movies sample data because I love movies and I want to find the bacon number

## QUERY LANGUAGE

You can build queries using cypher. It is asciiart. You can write a node with () and a relationship with -->

Or you can use neo4j.rb DSL.

For instance if you want to count how many people worked in a movie you could write:

```ruby
Neo4j::Session.query(%{
  MATCH (p:Person)-[r]->(m:Movie)
  return m.uuid, count(p)
}).map(&:to_a).to_h
```

Or

```ruby
Movie.all(:p)
 .movies(:m)
 .pluck('p.uuid', 'count(m)')
 .to_h
NEO4J.RB IN DETAIL
```

You can create a movie model

```ruby
class Movie
  include Neo4j::ActiveNode
  property :title
  property :released
  property :tagline

  has_many :in, :people, type: false
  has_many :in, :actors, type: :ACTED_IN, model_class: :Person
  has_many :in, :directors, type: :DIRECTED, model_class: :Person
  has_many :in, :producers, type: :PRODUCED, model_class: :Person
  has_many :in, :writers, type: :WROTE, model_class: :Person

  scope :search, -> (query) { where(title: Regexp.new("(?i).*#{query}.*")) }
end
```

You declare all attributes of the node type Movie with property and the relationships with has_many. Notice that we declare the direction of the relationship with :in and the type of relationship.

## PROBLEMS WITH N+1 QUERIES

So I wanted to show the list of movies and how many people worked on it.

![list of movies](http://staging.densitylabs.io/system/comfy/cms/files/files/000/000/149/original/neo-list_of_movies.png)

But the log was showing tons of queries

    Started GET "/" for ::1 at 2016-04-28 13:23:44 -0500
    Processing by MoviesController#index as HTML
     Movie#people 9ms MATCH (m:`Movie`) MATCH m<-[rel1]-(p:`Person`) RETURN m.uuid, count(p)
     CYPHER 9ms MATCH (n:`Movie`) RETURN n
     Movie#people 38ms MATCH (previous:`Movie`) WHERE (ID(previous) IN {ID_previous}) OPTIONAL MATCH previous<-[rel1]-(next:`Person`) RETURN ID(previous), collect(next) | {:ID_previous=>[0, 9, 10, 11, 15, 29, 37, 46, 52, 56, 62, 67, 73, 78, 81, 85, 87, 92, 95, 97, 100, 105, 109, 114, 119, 126, 128, 135, 139, 142, 145, 148, 150, 152, 155, 157, 159, 160]}
     Movie#people 3ms MATCH movie0 WHERE (ID(movie0) = {ID_movie0}) MATCH movie0<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie0=>0}
     Movie#people 5ms MATCH movie9 WHERE (ID(movie9) = {ID_movie9}) MATCH movie9<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie9=>9}
     Movie#people 4ms MATCH movie10 WHERE (ID(movie10) = {ID_movie10}) MATCH movie10<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie10=>10}
     Movie#people 5ms MATCH movie11 WHERE (ID(movie11) = {ID_movie11}) MATCH movie11<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie11=>11}
     Movie#people 3ms MATCH movie15 WHERE (ID(movie15) = {ID_movie15}) MATCH movie15<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie15=>15}
     Movie#people 3ms MATCH movie29 WHERE (ID(movie29) = {ID_movie29}) MATCH movie29<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie29=>29}
     Movie#people 4ms MATCH movie37 WHERE (ID(movie37) = {ID_movie37}) MATCH movie37<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie37=>37}
     Movie#people 4ms MATCH movie46 WHERE (ID(movie46) = {ID_movie46}) MATCH movie46<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie46=>46}
     Movie#people 27ms MATCH movie52 WHERE (ID(movie52) = {ID_movie52}) MATCH movie52<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie52=>52}
     Movie#people 5ms MATCH movie56 WHERE (ID(movie56) = {ID_movie56}) MATCH movie56<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie56=>56}
     Movie#people 9ms MATCH movie62 WHERE (ID(movie62) = {ID_movie62}) MATCH movie62<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie62=>62}
     Movie#people 3ms MATCH movie67 WHERE (ID(movie67) = {ID_movie67}) MATCH movie67<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie67=>67}
     Movie#people 7ms MATCH movie73 WHERE (ID(movie73) = {ID_movie73}) MATCH movie73<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie73=>73}
     Movie#people 11ms MATCH movie78 WHERE (ID(movie78) = {ID_movie78}) MATCH movie78<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie78=>78}
     Movie#people 10ms MATCH movie81 WHERE (ID(movie81) = {ID_movie81}) MATCH movie81<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie81=>81}
     Movie#people 17ms MATCH movie85 WHERE (ID(movie85) = {ID_movie85}) MATCH movie85<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie85=>85}
     Movie#people 4ms MATCH movie87 WHERE (ID(movie87) = {ID_movie87}) MATCH movie87<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie87=>87}
     Movie#people 6ms MATCH movie92 WHERE (ID(movie92) = {ID_movie92}) MATCH movie92<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie92=>92}
     Movie#people 6ms MATCH movie95 WHERE (ID(movie95) = {ID_movie95}) MATCH movie95<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie95=>95}
     Movie#people 5ms MATCH movie97 WHERE (ID(movie97) = {ID_movie97}) MATCH movie97<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie97=>97}
     Movie#people 4ms MATCH movie100 WHERE (ID(movie100) = {ID_movie100}) MATCH movie100<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie100=>100}
     Movie#people 5ms MATCH movie105 WHERE (ID(movie105) = {ID_movie105}) MATCH movie105<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie105=>105}
     Movie#people 4ms MATCH movie109 WHERE (ID(movie109) = {ID_movie109}) MATCH movie109<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie109=>109}
     Movie#people 4ms MATCH movie114 WHERE (ID(movie114) = {ID_movie114}) MATCH movie114<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie114=>114}
     Movie#people 11ms MATCH movie119 WHERE (ID(movie119) = {ID_movie119}) MATCH movie119<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie119=>119}
     Movie#people 4ms MATCH movie126 WHERE (ID(movie126) = {ID_movie126}) MATCH movie126<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie126=>126}
     Movie#people 4ms MATCH movie128 WHERE (ID(movie128) = {ID_movie128}) MATCH movie128<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie128=>128}
     Movie#people 4ms MATCH movie135 WHERE (ID(movie135) = {ID_movie135}) MATCH movie135<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie135=>135}
     Movie#people 11ms MATCH movie139 WHERE (ID(movie139) = {ID_movie139}) MATCH movie139<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie139=>139}
     Movie#people 57ms MATCH movie142 WHERE (ID(movie142) = {ID_movie142}) MATCH movie142<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie142=>142}
     Movie#people 7ms MATCH movie145 WHERE (ID(movie145) = {ID_movie145}) MATCH movie145<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie145=>145}
     Movie#people 4ms MATCH movie148 WHERE (ID(movie148) = {ID_movie148}) MATCH movie148<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie148=>148}
     Movie#people 4ms MATCH movie150 WHERE (ID(movie150) = {ID_movie150}) MATCH movie150<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie150=>150}
     Movie#people 4ms MATCH movie152 WHERE (ID(movie152) = {ID_movie152}) MATCH movie152<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie152=>152}
     Movie#people 3ms MATCH movie155 WHERE (ID(movie155) = {ID_movie155}) MATCH movie155<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie155=>155}
     Movie#people 10ms MATCH movie157 WHERE (ID(movie157) = {ID_movie157}) MATCH movie157<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie157=>157}
     Movie#people 8ms MATCH movie159 WHERE (ID(movie159) = {ID_movie159}) MATCH movie159<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie159=>159}
     Movie#people 17ms MATCH movie160 WHERE (ID(movie160) = {ID_movie160}) MATCH movie160<-[rel1]-(result_people:`Person`) RETURN count(result_people) AS result_people | {:ID_movie160=>160}
      Rendered movies/_movies.haml (519.5ms)
      Rendered movies/index.haml within layouts/application (524.1ms)
    Completed 200 OK in 967ms (Views: 955.3ms)

This happens because when you count the people that worked on each movie it runs one query for every movie record.

```ruby
@movies = Movie.all
movies.each do |m|
  m.people.count
end
```

On ActiveRecord this problem could be solved with include but that feature is not implemented in neo4j. However, you can use another query:

```ruby
@movies = Movie.all
p = Movie.people_in_movies
movies.each do |m|
  p[m.uuid]
end
```

and you add this file in the model

```ruby
class Movie
  def self.people_in_movies
    all(:m).people(:p).pluck('m.uuid', 'count(p)').to_h
  end
end
```

The class method Movie.people_in_movies will return a hash where the key is the movie id and the value is the number of people related to that movie

Now the log looks more interesting

    Started GET "/" for ::1 at 2016-04-28 13:29:18 -0500
    Processing by MoviesController#index as HTML
     Movie#people 7ms MATCH (m:`Movie`) MATCH m<-[rel1]-(p:`Person`) RETURN m.uuid, count(p)
     CYPHER 9ms MATCH (n:`Movie`) RETURN n
      Rendered movies/_movies.haml (22.4ms)
      Rendered movies/index.haml within layouts/application (24.9ms)
    Completed 200 OK in 200ms (Views: 190.0ms)

Also, notice the performance improvement. Now the response takes 190ms instead of 955.3ms.

On my next post I would like to prove that Keving Bacon is the center of the universe using neo4j

Feel free to share it and add comments. Thanks for reading!
