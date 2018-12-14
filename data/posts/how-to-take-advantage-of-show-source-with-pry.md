---
name: How to take advantage of show source with pry
date: "2016-05-13"
image: ./how-to-take-advantage-of-show-source-with-pry-picture.jpg
tags:
  - ruby
  - ruby-on-rails
  - pry
  - pry-rails
author: Tonatiuh Núñez
---
If you haven't heard of the pry gem I would encourage you to take a look at it. It can certainly help you speed up the debugging process of your code. The gem's repo can be found here: [https://github.com/pry/pry](https://github.com/pry/pry).

Have you tried using the [show-source](https://github.com/pry/pry/wiki/Source-browsing#view-method-and-class-source-code-with-show-source) command?

The "show-source" command has changed the way I debug code. In the past, I used to follow an error's backtrace by adding a "binding.pry" above the error line, then I'd run the code again and start copying code from the editor to run it in the ruby session, switching back and forth from the editor to the terminal until I find the error's origin. Now I just add the "binding.pry" and switch to the Ruby session to do all the debugging from there. There is no need to go back to the editor until I find the error's origin.

## An example

Lets see an example. Let's say your application is about blog posts, it uses Rails and the following controller:

```ruby
class PostsController
  def create
    post_manager = PostManager.new(params)

    if post_manager.create
      redirect_to :show, post: post_manager.post
    else
      redirect_to :new, error: 'There was an error creating the post'
    end
  end
end
```

However, any time you attempt to create a post you receive an error: "There was an error creating the post". You add a "binding.pry" above "post_manager.create" as in:

```ruby
...
binding.pry
if post_manager.create
  redirect_to action: :show, post: post_manager.post
else
...
```

Run the code again, go back to the terminal and find the Rails server stopped at the "binding.pry" call:

```ruby
 => binding.pry
    if post_manager.create
      redirect_to action: :show, post: post_manager.post
    else

[1] pry(<PostsController>)> _
```

Then you run from there:

```ruby
[1] pry(<PostsController>)> show-source post_manager.create

From: (pry) @ line 8:
Owner: PostManager
Visibility: public
Number of lines: 4

def create
  return unless params[:author_id] && params[:body]
  Post.create(body: params[:body], author_id: params[:author_id])
end
```

Now that the post_manager#create content has appeared, you see that the author_id param is required, otherwise, it won't create the post. Time to check the params:

```ruby
[2] pry(<PostsController>)> params
{
  'body' => 'The body of my rocking post!'
}
```

You just found the author_id param is not present, that must be the issue. At this point you add to the params the id of one the existent users:

```ruby
[3] pry(<PostsController>)> params[:author_id] = User.last.id
1
[4] pry(<PostsController>)> params
=> {:author_id=>123, :body=>"The body of my post rocks!"}
```

Try again to see if that fixes the error:

```ruby
[5] pry(<PostsController>)> post_manager = PostManager.new(params)
=> <PostCreator:0x007fb4e0a8a538>
[6] pry(<PostsController>)> post_manager.create
=> true
[6] pry(<PostsController>)> Posts.count
=> 1
```

Great, that fixes the issue! Now you know what is needed to make the post creation work, you need to send the author_id param from the front-end.

## Final thoughts

Keep in mind that the example above is pretty simple, we didn't need to go deeper in the debug process, staying all time in the controller's context.

There are other situations, for instance if the error was located in a class used by the PostManager, in that case, we would need to jump from the controller's context to the PostManager and then to other class. In cases like that, you can use the [cd](https://github.com/pry/pry/wiki/State-navigation#Changing_scope) command to jump from one context to another, and the "show-source" command to easily check the code without needing to go back to your editor.

In my experience, I've found that using the "show-source" command in combination with the "cd" command makes the code navigation faster and easier, compared to going back and forth from the editor to ruby session.

So what do you think? Do you know other useful pry commands? Do you have any tip you want to share?

Would you like to learn more about pry together? We can schedule a pairing session! It should be fun.