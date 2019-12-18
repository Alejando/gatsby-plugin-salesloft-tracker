---
name: "Why You Should Avoid Using Redux for Your Forms"
date: "2019-12-19"
image: ./why-you-should-avoid-using-redux-for-your-forms.jpg
keywords: "Redux, react, web, react and redux, redux forms, forms, redux state, react state, boilerplate code, code, contact form"
author: Javier Ponce
social_summary: "Redux is not always the best solution to handle your component state. We will see the cost of using it in your forms."
tags:
  - redux
  - react
  - state
  - redux-forms
description: "Redux is not always the best solution to handle your component state. We will see the cost of using it in your forms."
---

In recent years, we have learned to use Redux with simple applications like todo-lists or forms, but are these a good example? What if our application has grown considerably?

We need to keep in mind that dispatching an action will reach all our reducers.

Let’s use the following example: Our application has a single reducer for a basic contact form and we are updating each field dispatching an action:
​
```javascript
// Basic contact form
const Form = ({
  name,
  email,
  message,
  setFieldValue,
}) => {
  return (
    <div className="form">
      <label>
        Name:
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setFieldValue('name', e.target.value)}
        />
      </label>
      <br />
      <label>
        E-mail:
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setFieldValue('email', e.target.value)}
        />
      </label>
      <br />
      <label>
        Message:
        <textarea
          id="message"
          value={message}
          onChange={e => setFieldValue('message', e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Send your message</button>
    </div>
  );
}
```

```javascript
// Reducer
const initialState = {
  name: '',
  email: '',
  message: ''
}

const createReducer = n => (state, action) => {
  switch (action.type) {
    case `FORM_${n}/SET_FIELD_VALUE`:
      return {
        ...state,
        [action.field]: action.text
      }
    default:
      return state
  }
}
```

In this case, we are just reaching our single reducer when dispatching an action:


![Redux One Form Example](/images/one-form.gif "Redux One Form Example")



This may be “OK” for small apps but the latency will continue to increase as our app grows. Now, imagine that we have 50 reducers:


![Redux Many Forms Example](/images/many-forms.gif "Redux Many Forms Example")


We will be hitting all the reducers on EVERY SINGLE KEYSTROKE.

As Dan Abramov says, [forms are ephemeral and local](https://github.com/reduxjs/redux/issues/1287#issuecomment-175351978). The redux state is intended to be global. Using a local state is fine, and if we need to share these values, we can lift up your state to the [closest common ancestor](https://reactjs.org/docs/lifting-state-up.html).

## Handling the state locally

This is the same form using a local state:

```javascript
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          E-mail:
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            name="message"
            type="text"
            value={this.state.comments}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

With this approach we get the following benefits:

1. No need to hit any reducer

2. Better performance. Plus, this won’t be affected even if the app continues to grow (having more reducers)

But, what if we want to have more forms? Do we need copy-paste the `handleInputChange` function for each form? Or what if we need to run validations? Is there a way to avoid all this boilerplate code?

The answer to these questions is a nice alternative: [Formik].

Formik does all this magic for us under the hood. I won’t cover how to use Formik in this post since it provides good [documentation](https://jaredpalmer.com/formik/docs/overview). However, I would like to mention that [Formik] + [Yup] will solve most of your problems.

Are you interested in looking at Formik in more depth? Let me know in the comments!

## Conclusion

Using the local state on React is usually better. You should use Redux for complex state transitions, when you need to keep track of the changes or when it matters globally.

...

I created this repository which demonstrates the performance impact with lots of forms, feel free to take a look!: https://github.com/densitylabs/blog-reference-examples/tree/master/redux-in-forms

[Formik]: https://jaredpalmer.com/formik

[Yup]: https://github.com/jquense/yup 


