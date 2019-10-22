---
name: "Quick intro to Redux"
date: "2019-10-21"
image: ./quick-intro-to-redux.jpg
keywords: "redux, react, redux-api, state, actions, reducers, store, components, operation, app, wiring, implementation"
author: "Tonatiuh Núñez"
social_summary: "A quick intro to Redux to simplify 4 core concepts: Actions, Reducers, Store and Components. Redux helps you keep the state of your React app organized and centralized because managing the state only with React can become messy sometimes."
tags:
  - redux
  - react
  - store
  - reducers
  - state
description: "A quick intro to Redux to simplify 4 core concepts: Actions, Reducers, Store and Components. Redux helps you keep the state of your React app organized and centralized because managing the state only with React can become messy sometimes."
---

The first time I approached Redux I was overwhelmed by the concepts around it. Because of that, I didn't continue studying more about Redux, until months later when the project I worked on required it.
I want to share a quick intro to Redux with you, trying to simplify the concepts around it for an easy understanding.

The "problem" that Redux solves
-------------------------------

Redux is "a predictable state container for JavaScript apps" - in other words, it helps you keep the state of your React app organized and centralized. It defines a flow around the way the components read and consume the state as well as the operations to be executed to update such state. That becomes helpful because managing the state only with React can become messy sometimes.

This example - which might not be the best - can help to illustrate that managing the state with React alone can become messy sometimes vs managing the state with Redux:

1. Let's say you're building a React component "(a)" that lists movies and their info
2. A user can click on one of the movies and another component "(b)" will pop up with the movie info:

  * Actors
  * Reviews

3. On component "(b)" you can click on "Add actor" and another component "(c)" will be shown to enter the actor info

  * Once you entered the actor's info
  * The actor's info needs to be updated in the React state - the state that was defined on component "(a)"

4. The same can apply for a new review on a component "(d)"

In the example above you can see the high dependency between those components. They're arranged on a "pyramid structure" where the components at the higher levels depend heavily on the components at the lower levels. Components "c" and "d" will not only depend on their parent to receive the necessary data, but they will also be updating the state each on their own / and probably their own way. That can likely lead to inconsistency and make it harder to track down where the state changed (in case of bugs).

Redux cuts off the dependency between components on that "pyramid structure", and also provides a consistent way to update the state on one single place.

The core concepts of Redux
--------------------------

Redux is composed of four concepts:

1. Actions
2. Reducers
3. Store
4. Components

Those four things interact in a consistent / "one way only" flow:

![Redux flow](https://cl.ly/64aac0bf290b/Image%2525202019-10-14%252520at%2525209.57.04%252520AM.png "Redux flow")

Let's see what is each of those concepts is about and a quick implementation with them.

Actions (concept #1)
--------------------

Actions are plain JS functions that will be triggered by the React components. Let's say for example that in your React component the following field and button are being exposed:

![Field and button](https://cl.ly/c4ec0ed06b10/Image%2525202019-10-14%252520at%2525209.48.16%252520AM.png "Field and button")

Assuming the user filled the field, when the user clicks on the "Add" button you'll call your Action. In the Action you can perform any extra operation you need to perform, and then pass the data you want the Reducer to read (so that it updates the state). In this case, the data you'll pass to the Reducer is the todo itself.

Let's see the Action's code:

```js
export const addTodo = todoLabel => ({
  type: 'ADD_TODO',
  payload: {
    completed: false,
    todoLabel
  }
});
```

Let's see what's this Action's code about. As stated before, the Action is nothing more than a plain function called `addTodo` which receives a parameter called `todoLabel`. Such function returns (what will be received by the Reducer) an object that needs to comply with a "convention":

* A `type` attribute: this attribute works as an identifier for the Reducer to be able to say something like "Hey, this data I got belongs to the `'ADD_TODO'` case"
* A `payload` attribute: this attribute should contain the data we want to add to the state (in this case, is the todo we want to add)

The field names ("type" and "payload") don't strictly need to be those as you'll find when you see the Reducer, but I highly recommend using those since it's super common to see those being used in general.

Reducers (concept #2)
---------------------

Let's see what happens in the Reducers:

1. They receive data from the Actions
2. Then they "reduce" it / combine it with the data they already have
3. Then such reduced data is passed to update the store (generate a new state)

The way to define Reducers in Redux is as plain functions. The Reducer will receive two parameters:
1. A `state` parameter. This parameter contains the Redux app state - so that we can combine it with whatever new data the Reducer receives
2. An `action` parameter. This parameter contains the data the Action passed to the Reducer (it'll have the `type` and `payload` parameters we were talking about before)

Now that we got an idea what a Reducer is about, let's get a grip on the implementation:

```js
const INITIAL_STATE = {
  todos: [],
}

export default (state = INITIAL_STATE, action) => {
  console.log('action', action);
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    default:
      return state
  }
}
```

The Reducer needs to set a default value to start with, it also needs to be able to return something by default. That's why the `state` parameter of the function is set to `INITIAL_STATE` initially. And also that's why there is a `default` statement at the end of the `swicth` statement.

Tying up what we saw before about the Action and what we have here about the Reducer, we can see that:

1. When the action is executed it'll return an object which Redux will get in this Reducer
2. This Reducer will execute with the `switch` statement in contains
3. The switch statement will compare the `type` field in the action
4. Given that the `case` statement for `ADD_TODO` will match then I'll execute the code inside
5. The code inside the case statement will add the new todo to the existent todo list

That's pretty much the flow in a Reducer, what happens next is that Redux takes whatever data the Reducer returns and updates the Store with that data.

Store (concept #3)
------------------

The Store holds the Redux app state, which will feed the React components. In that way, after a Reducer updates the Store with a new piece of state, a component depending on that piece of state will re-render and show the new data from the Store. This completes the Redux flow:

* Started by an interaction with the component (a click on a button)
* The Action was triggered 
* Then the Reducer was triggered 
* Then the Store was updated
* Finally, a component will re-render showing the updated data from the Store

It's worth to mention that the Store can be composed of one or more Reducers.

Components - the wiring (concept #4)
-----------------------

We've been talking about the Actions being triggered from the components, so it's worth to mention an arrangement that Redux requires on the components to properly hook them Redux:

* Stateless components
* Container components

Stateless components:

* These components don't have a state (as the name indicates) they only receive props for two things
1) Props that are data to be rendered in the component 
2) Props that are functions to be called when interactions with the component happen (ex. a user click)

Container components:

* These components hook the Actions and the Store data from Redux to the stateless component

Let's see the implementation of those two types of components for our example.

The stateless component:

```js
import React from 'react';

const Todos = ({ todos, addTodo }) => {
  let input;

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>

      <ul>
        {todos.map((todo, i) =>
          <li key={i}>
            {todo.todoLabel}
          </li>
        )}
      </ul>
    </div >
  );
};

export default Todos
```

This stateless component is receiving the list of `todos` as well as the `addTodo` Action to be called when the user submits a new todo.

The container component on the other hand:

```js
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo } from '../actions';

const mapStateToProps = state => {
  return { todos: state.todos }
}

console.log('addTodo', addTodo);
const mapDispatchToProps = {
  addTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)
```

This container component connects the state and the actions to the stateless component. It does that:

* Through the `connect` function that it imports from `react-redux` 
* Passing the `mapStateToProps` function that it creates 
* And the `mapDispatchToProps` function that it also creates

The last thing we need to do is wire the container component to the Store, the implementation for that will be the following:

```js
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TodosContainer from './containers/TodosContainer'
import reducers from './reducer'

const store = createStore(reducers)

export default class TodoRedux extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TodosContainer />
      </Provider>
    );
  }
}
```

You can find a working example based on these code snippets [here](https://github.com/densitylabs/blog-reference-examples/tree/master/quick_intro_redux).

Conclusion
----------

I guess you may still be thinking there are many parts to be combined on Redux, but you can see that it's only three main concepts and the last one (the wiring) is all about implementation. In my opinion, as long as you dominate the concepts then the wiring is going to be easy because you understand what is going on.

If you haven't tried Redux I encourage you to give it a try! I've found it very beneficial!

Quick note: React 16 officially introduced the Context API and the useReducer hook, those provide alike functionality as Redux. We plan to launch a blog post about those soon - stay tuned!

Cheers!