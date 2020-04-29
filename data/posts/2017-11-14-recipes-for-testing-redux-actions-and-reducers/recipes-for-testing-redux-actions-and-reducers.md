---
name: Recipes for Testing Redux Actions and Reducers
date: "2017-11-14"
image: ./recipes-for-testing-redux-actions-and-reducers.jpg
description: I’d like to share my knowledge and personal approach to testing when building a Redux app. While there are many ways of doing this, if you are trying to figure out how to start testing your common Redux actions and reducers for your upcoming projects, this post is for you.
tags:
  - react
  - redux
  - testing
  - mocha
author: Alfonso Alejandro Espinosa de los Monteros Andrade
social_summary: I’d like to share my knowledge and personal approach to testing when building a Redux app. While there are many ways of doing this, if you are trying to figure out how to start testing your common Redux actions and reducers for your upcoming projects, this post is for you.
---
Recipes for Testing Redux Actions and Reducers

I’d like to share my knowledge and personal approach to testing when building a Redux app. While there are many ways of doing this, if you are trying to figure out how to start testing your common Redux actions and reducers for your upcoming projects, this post is for you.

TOOLING

First things first, our tooling consists of the following packages:
* redux-thunk
* chai
* axios
* redux-mock-store
* axios-mock-adapter

We'll see how each of these tools is used while testing Redux actions and reducers.

RECIPE FOR ACTIONS

Our Redux actions are simple functions that return a new JavaScript Object with a type property. Each Redux actions will dispatch a change to the current state of the application. A simple action will look like this:


```javascript
export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
```

Above we have an Action Creator. Although it is not shown above, you may have a property called `showModal`. In the UI we will have to call this function whenever we try to hide the modal that is currently showing.

```javascript
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import * as Actions from './actions/your_action_file';
import {initial_state} from './reducers/your_reducer_file';
const middlewares = [];
const mockStore = configureMockStore(middlewares);
describe('testing actions', () => {
  it('closes the modal', () => {
    const store = mockStore(initial_state);
    store.dispatch(Actions.closeModal());
    expect(store.getActions()).to.deep.equal([{
      'type': 'CLOSE_MODAL'
    }]);
  });
});
```


In the code above we import “expect” from Chai to get more assertions than the ones the Mocha framework brings to the table. We also import our Redux actions (such as `closeModal`), so that we can test them using `store.dispatch()` like in our Redux flow. To simulate dispatching the Redux action we call `store.dispatch(Actions.closeModal())` where "store" is an instance of `mockStore`. Next we verify that the action was dispatched correctly.

HANDLING MORE COMPLEX ACTIONS

When working with React we have the concept of controlled components. We need to set the state of the current inputs displayed in our component, but what if we have multiple inputs? The easiest way would be to create several handlers for our current inputs to get the right data, but as our application grows, this approach makes the code hard to maintain (it's not DRY). Let me show you how I like to proceed in these cases.

```javascript
export function createUser(attribute, value) {
  return {
    type: CREATE_USER,
    payload: {
      [attribute]: value
    }
  };
}
```

In this example, notice that we are passing two values to the `createUser()` function: `attribute` and `name`. The idea is that the action `createUser` can be called to update any user attribute (as the user updates her info in the UI). So that when the user enters his as "Joe" for instance, the action `createUser` will be called with `userName` as the first parameter, and `Joe` as the second parameter.

*The `payload` parameter (returned by the `createUser` action) is used by a lot of JavaScript developers when sending the data to the Redux reducers.






Let's test the Redux action `createUser`.

```javascript
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import * as Actions from './actions/your_action_file';
import {initial_state} from './reducers/your_reducer_file';
const middlewares = [];
const mockStore = configureMockStore(middlewares);
describe('testing actions', () => {
  it('updates the user data', () => {
    const store = mockStore(initial_state);

    store.dispatch(Actions.createUser('userName', 'Alex Espinosa'));

    expect(store.getActions()).to.deep.equal([{
      'type': 'CREATE_USER',
      'payload': {
        'userName': 'Alex Espinosa'
      }
    }]);
  });
});

```

Here the test is pretty much like the one previously shown. It verifies that the action dispatches the right data, checking that the `payload` object has the right content. I find testing this type of functionality highly important given that many HTML inputs in the UI may depend on it.

TESTING ASYNCHRONOUS REDUX ACTIONS


Another scenario I see very often is Redux actions that make calls to an API. Let´s see a basic example, here is a Redux action that fetches a list of users from an API.

```javascript
export function fetchUserInfo() {
  return (dispatch) => {
    return axios.get('/the_api_endpoint_here')
      .then((response) => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      });
  };
}
```

Let's see how to test the Redux action shared above.

```javascript
import { expect } from 'chai';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Actions from './actions/your_action_file';
import { initial_state } from './reducers/your_reducer_file';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('USER actions', () => {
  let mock;
  before(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });
  after(() => {
    mock.restore();
  });
   it('fetches the users info', () => {
      const response = [{ name: 'alex espinosa', id: '1003', phone_numbers: ['1010101010'], type: 'user' }];
      const action = [
        {
          'type': 'FETCH_USERS',
          'payload': response
        }
      ];
      mock.onGet('/your_endpoint_here').reply(200, response);
      const store = mockStore(initial_state);
      return store.dispatch(Actions.fetchUserInfo()).then(() => {
        expect(store.getActions()).to.deep.equal(action);
      });
    });
});
```

Here are some key points related the previous test.

Axios: is a popular package that simplifies making HTTP requests.
Axios Mock Store: this package allow us to mock HTTP calls in the test (so that the backend can be mocked).
Test hooks: the `before`, `beforeEach`, and `after` hooks. Those are used to make sure the Axios mock is properly cleaned before each test.


When mocking the Redux store in the test is necessary to use "redux-thunk" because the request is asynchronous. Then by using "redux-mock-store" (`mock = new MockAdapter(axios)`) we mock the HTTP request that gets the users: `mock.onGet(‘/your_endpoint_here').reply(200, response)` where "response" is the array of users.

Finally, we make sure that the response and the action type dispatched matches the expected result.


RECIPE FOR REDUCERS

Testing reducers is really straightforward  because they are pure functions. It should calculate the next state and return it. No side effects. No API calls. No mutations.

```javascript
import {
  CLOSE_MODAL,
  CREATE_USER,
  FETCH_USERS
} from '../actions/blogpost';

export const initial_state = {
  showModal: false,
  user: null,
  phone_numbers: [],
  id: null,
  userName: '',
  type: '',
  modalError: null
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        showModal: false,
        user: null,
        modalError: null,
      });
    case CREATE_USER:
      return Object.assign({}, state, {
        userName: action.payload.userName
      })
    case FETCH_USERS:
      return Object.assign({}, state, {
        userName: action.payload.name,
        id: action.payload.id,
        phone_numbers: action.payload.phone_numbers,
        type: action.payload.type
      });
    default:
      return state;
  }
};
```


Our reducer boilerplate just calculates the next piece of state. Back in our `closeModal` example we switch the property showModal to false.
We could be testing every case scenario, but that would involve too much code for this short blogpost and we know you need to hurry because you have some tests to add to your project, so let’s go ahead and test CLOSE_MODAL and CREATE_USER.

```javascript
import { expect } from 'chai';
import reducer, { initial_state } from '../../reducers/blogpost';
import * as actions from '../../actions/blogpost';
describe('Testing reducer', () => {
  it('close the modal', () => {
    const action = { type: actions.CLOSE_MODAL };
    expect(reducer(initial_state, action)).to.deep.equal({
      ...initial_state,
      showModal: false,
      user: null,
      modalError: null
    })
  });
  it(' updates User Name or given input', () => {
    const action = {
      type: actions.CREATE_USER,
      payload: {
        'userName': 'Alex Espinosa'
      }
    };
    expect(reducer(initial_state, action)).to.deep.equal({
      ...initial_state,
      userName: 'Alex Espinosa'
    })
  });
});
```

As you can see above, it is pretty simple to test reducers. Given certain action type like CLOSE_MODAL, make sure the state is updated as expected. You can keep going forward testing every case scenario inside the reducers, but there is no magic, no helpers only testing a pure function.

CONCLUSIONS

When it comes to building apps, testing is getting more and more common in our development life. Testing assures that we have the correct values and the code is working as expected. For my coworkers and I, it is really important to test every possible scenario.

A great practice when working with someone else’s code is to run the test suite before every tweak or change. Here at Density Labs, testing is a major step in our development process. If you have any questions or you want to contact us to work on your project, feel free to reach us at: www.densitylabs.io/contact-us.


