---
name: 'How to: Advanced Filtering with Ransack and "OR" Groupings'
date: "2019-06-26"
image: ./ransack-or-filtering.png
keywords: Ruby, Rails, Ruby on Rails, Ransack, Filtering, ruby-on-rails, Densitylabs, Density, Labs
author: Zian Aguirre
social_summary: A while ago, I was working on a CMS-like project that needed a custom filter for its User model; the filter was supposed to be a select-like component displaying all the available roles and the user should be able to pick more than one role and the filter should pick up any user with the selected roles. So I decided to Ransack it
tags:
  - ruby
  - rails
  - ransack
  - filtering
---
A while ago, I was working on a CMS-like project that needed a custom filter for its User model; the filter was supposed to be a select-like component displaying all the available roles and the user should be able to pick more than one role and the filter should pick up any user with the selected roles.

So I decided to _[Ransack it](https://github.com/activerecord-hackery/ransack)_.

## Prep Work

First, I needed a way to get all the roles available, I didn’t want to hardcode them since we keep adding new roles and that could cause some trouble.

All our role columns have a `_role` suffix, so it's easy to get them this way:

```ruby
# app/models/user.rb
def self.available_roles
  column_names.select { |column_name| column_name =~ /_role/ }
end
```

## Working on the Filter

Next I needed to create the select used for displaying all the available roles and selecting them for the filter.

```ruby
# app/views/users/_search.haml
= f.select :with_roles, |
 @available_roles, |
 { include_false: false }, |
 class: 'select2 form-control users-roles-select', |
 'data-placeholder': 'roles', |
 'data-width': '80%', |
 multiple: true
```

It is worth noting that for this select, I used [Select2](https://github.com/argerim/select2-rails).

I decided to make a small test selecting two roles (`full_time_role` and `manager_role`) and sending the form to check how the params are being sent to the backend.

```ruby
{“utf8"=>"✓", "q"=>{ "with_roles"=>["", "full_time_role", "manager_role"]}, "commit"=>"Search", "controller"=>"users", "action"=>"index”}
````

Nice! It was time to move to the good stuff: creating the scope and using Ransack’s groupings.
Adding the custom scope and the "OR" grouping

## Adding the Custom Scope and the "OR" Grouping

I added a custom scope to the User model, called it `with_roles` to be used like `User.with_roles([array, of, roles])`. Pretty nice, huh?

Since I wanted to pass an `Array` of arguments as `*args` to the ActiveRecord scope, I needed to make sure whatever it receives is an actual role defined in the model so I placed a guard condition to return an empty array if nothing matches any role. It is important the name of the scope matches with the symbol used for the select.

```ruby
# app/models/user.rb
scope :with_roles, -> (*args) {
  roles = args.flatten.select { |role| available_roles.include?(role) }
  return [] if roles.empty?
}
```

Ransack expects a `Hash` with the keys being the [matchers](https://github.com/activerecord-hackery/ransack#search-matchers) and the values wanted to filter with. For this case in particular I used the `*_eq` (equal) matcher. Now I needed to build our search conditions `Hash` for each role.

```ruby
# app/models/user.rb
scope :with_roles, -> (*args) {
  roles = args.flatten.select { |role| available_roles.include?(role) }
  return [] if roles.empty?

  search_conditions = {}
  roles.each { |role| search_conditions["#{role}_eq"] = true }
}

```

That set `search_conditions` to have contents like `{“full_time_role_eq” => true, “manager_role_eq” => true}`. Then I passed this to Ransack and the result was a SQL query that looked up users that had both roles.

```SQL
SELECT "users".* FROM "users" WHERE ('t'='t') AND ("users"."full_time_role" = 't' AND "users"."manager_role" = 't')
```

However, that’s not what I wanted which was to get any user that had one role or the other. Ransack by default groups the conditions with `AND`, so if I wanted the conditions to be grouped with an `OR` instead I  just needed to merge `m: 'or'` in the `search_conditions` query hash. This is how the scope ended up looking:

```ruby
# app/models/user.rb
scope :with_roles, -> (*args) {
  roles = args.flatten.select { |role| available_roles.include?(role) }
  return [] if roles.empty?

  search_conditions = {}
  roles.each { |role| search_conditions["#{role}_eq"] = true }

  search(search_conditions.merge(m: 'or')).result
}
```

One last and important step is to add this new scope as a _Ransackable Scope_, otherwise it won’t work properly with our form. For that I just needed to define the following method in the User model.

```ruby
# app/models/user.rb
def self.ransackable_scopes(auth_object = nil)
  # if you add more ransackable scopes,
  # just add the names here as a symbol
  [:with_roles]
end
```

And that’s it.

The groupings can also be changed in the controllers too, as shown in the [documentation](https://github.com/activerecord-hackery/ransack):

```ruby
def index
  @q = Artist.ransack(params[:q].try(:merge, m: 'or'))
  @artists = @q.result
end
```

## Closing Thoughts

Ransack is a versatile gem that allows you to build simple yet flexible search forms with little effort. By using Advanced Filtering and Custom Groupings in Ransack you can build complex search queries on the fly in an elegant manner. It’s because of things like these is that I like [Ransack](https://github.com/activerecord-hackery/ransack).

So what do you think about these features?
Do you see yourself using these Ransack features?

Let me know in the comments!
