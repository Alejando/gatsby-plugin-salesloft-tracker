---
name: Adding authentication to your react native app
date: "2017-04-21"
image: ./Adding_authentication_to_your_react_native_app.jpg
tags:
  - react-native
  - mobile
  - react
  - authentication
author: Ivan Velasquez
---
I’ve been working recently on creating mobile applications using React Native. Few days ago I had to add an authentication login form to the application I’m working on, easy peasy. When I implemented that by first time I had no idea how to do it on the React Native way. I did some research on the subject, but at the end I didn’t find what I was looking for at that time; by trial and error I was able to implement a solution.

I imagine I’m not the first one who has been in that situation and won’t be the last either. I'm going to share the approach that applied back then and that I continue applying.

## Reverse engineering

A good practice to find out our own solution, is to apply reverse engineering in apps that already implemented it. I reviewed how Facebook implemented their login form and authentication strategy and I found the next:

1. When a user downloads the app by first time and opens it, the app contains 3 public sections: Login, Signup & Forgot Password screen.

2. Once a user signs in, then closes the app and opens it again: the user doesn’t have to sign in again, so it uses data persistence.

3. When a user is already signed in, then closes the app and opens it again: for a few seconds there is an empty white screen and then the basic profile information loads.

## Implementing the solution.

Let’s suppose we are building a todo app where we have the following sections/screen:

* Login form
* Signup form
* Tasks list

There are many ways to handle the navigation in our React Native apps. I like to use [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) since it is pretty similar to React Router library for web, it allows to manage the Navigation API provided by React Native in a easiest way and even integrate it with Redux.

This is how main.js looks like.

```javascript
// main.js

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './components/login';
import Signup from './components/signup';
import TaskList from './components/task-list';

const App = () => {
  return(
    <Router>
      <Scene key="auth">
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Scene>

      <Scene key="main">
        <Scene key="tasks" component={TaskList}/>
      </Scene>
    </Router>
  );
}

export default App;

```

From the LoginForm component we need to send a request to the backend to send our credentials and process the response that it sends back.

```javascript
// components/login.js

...


login(email, password) {
  axios
    .post(LOGIN_URL)
    .then((response) => {})
    .catch((err) => {})
}


...

```

Let's suppose our backend is using an Oauth strategy for authentication, if the credentials that we sent are the right ones our backend will retrieve the user data including an `access_token` and the application will redirect the users to the Tasks list section; otherwise the application will display an alert message to the users.


```javascript
// components/login.js

import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

...


login(email, password) {
  axios
    .post(LOGIN_URL)
    .then((response) => Actions.main({type: "reset"}))
    .catch((err) => Alert.alert('Invalid email or password'))
}


...

```


In order to change from one section to another react-native-router-flux uses a simple syntax using the Actions that expose our routes created in our main.js files as methods, the parameter `{type: ‘reset’ }` indicates that the history stack will be deleted and there will be no transition in the change of sections.

The solution is almost complete. We only need to implement the data persistence in case the users closes the app and opens it again, in that scenario the app should redirect the user to the tasks list section. To accomplish that we will make use of AsyncStorage.

According to the [official documentation](https://facebook.github.io/react-native/docs/asyncstorage.html), AsyncStorage is a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

When the backend sends the user’s information we should store this information locally using AsyncStorage.

```javascript
// components/login.js

import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

...


login(email, password) {
  axios
    .post(LOGIN_URL)
    .then((response) => AsyncStorage.setItem('user', JSON.stringify(response.data)))
    .then((user) => Actions.main({type: "reset"}))
    .catch((err) => Alert.alert('Invalid email or password'))
}


...

```

In order to know which section the user should be redirected I usually use a Placeholder component like Facebook does.

```javascript
// components/placeholder.js

import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

class Placeholder extends Component {
  componentWillMount(){
    AsyncStorage.getItem('user')
     .then((data) => {
       if(data) {
          const user = JSON.parse(data);
          return axios.get(VALIDATE_ACCESS_TOKEN_URL,
            { headers: { email: user.email, access_token: user.access_token } }
          )
          .then(() => Actions.main({ type: "reset" }))
       }
       else {
         Actions.auth({ type: "reset" });
       }
     })
     .catch((err) => Actions.auth({ type: "reset" }));
  }

  render() {
    return(
      <View>
      </View>
    );
  }
}

export default Placeholder;

```

This component will be shown to the user while the app validates if there is any information stored locally, if there is information the app also needs to validate the `access_token`. In case there is no information stored locally or the `access_token` is invalid, the app will redirect the user to the Login form section. In the other hand, the app will redirect the user to the tasks list section.

We need to change the `main.js` file to make the Placeholder component the root component.

```javascript
// main.js

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Placeholder from './components/placeholder';
import Login from './components/login';
import Signup from './components/signup';
import TaskList from './components/task-list';

const App = () => {
  return(
    <Router>
      <Scene key="root">
        <Scene key="placeholder" component={Placeholder} />
      </Scene>

      <Scene key="auth">
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Scene>

      <Scene key="main">
        <Scene key="tasks" component={TaskList}/>
      </Scene>
    </Router>
  );
}

export default App;

```


## Conclusions

There are probably more ways to implement an authentication for a React Native app but I consider there is a great advantage using this approach because the Placeholder component is the one in charge of validating the existence of local information.
