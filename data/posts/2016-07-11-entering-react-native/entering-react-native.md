---
name: Entering React Native
date: "2016-07-11"
image: "./entering-react-native.jpg"
tags:
  - react
  - react-native
  - product development
  - android
  - ios
author: Tonatiuh Núñez
social_summary: Building a Hacker News client with React Native
---
Was some years ago [back in 2014](http://www.smartinsights.com/mobile-marketing/mobile-marketing-analytics/mobile-marketing-statistics/) when desktop internet usage was overtaken by mobile usage, since that time mobile usage has continued increasing. Given the amount of users using mobile devices to access the internet, it has become very important for a developer to dominate tools for developing mobile applications.

React Native is a Javascript framework (created by Facebook) for developing mobile apps for iOS and Android, it was launched in 2015 and since then it has become strongly popular.

In this post, I'll walk you through the basics of React Native. We'll cover the main principles of React Native, the setup of a "Hello world" app, and some of the most common components (the main element in React Native).

## Why React Native?

One of the main benefits that React Native offers is making apps work on both platforms (iOS and Android) with pretty much the same code (React Native code).

Another big benefit of React Native is that the JS code is translated to native platform components. That means that the app will perform fluid and that UI components won't look weird, given they're the native platform's components.

There are other options for developing iOS and Android apps using the same base code (there is Ionic for instance). However, the disadvantage they have is that instead of generating apps that consist of native components, they generate apps that wrap HTML code that simulates native components. Thus, their performance is not as good as React Native is, nor they look as native as native components look.

So at the end, you write Javascript code (one of the most popular languages nowadays) which is compiled to native platform components at the same time for both platforms.

## The main aspects of React Native

Is component based:

- In React Native almost everything is a component. A component represents an element that you will show in the UI, you encapsulate logic in it, and allow it to behave according to the data it receives and the logic you set. Because components by nature are independent each other, you can easily reuse them in other applications.

Is declarative:

- Being declarative means that certain code calls orders needs to be done, without going into details of how to do it. When you create a new user interface in React Native, you specify what components need to appear in the interface, you pass them the data they need, but you don't tell them how they need to operate, they're supposed to internally manage them selfs to behave as they're supposed to.

Data binding:

- Another main aspect of React Native is how it specifies data must travel through components. Data must travel from parent components to children components, never the opposite. That makes easier to debug errors knowing data travels on one direction.

## The basics of components

React Native provides a set of components that you can use to build your app, then when the project is compiled those React Native components are transformed to the equivalent native components in the platform (iOS or Android).

Let's check some of the most common components:

- Text: this component allows us to add text to the screen. So for instance if you want to show on the screen a text such as "Hello world", then you would call the component as follows:

```html
<Text>Hello world</Text>
```

- Image: as the name tells, allows to show an image in the UI. If you need to show an image called "me.jpg" then you will call the component as:

```html
<Image source={require('./me.jpg')}></Image>
```

- View: a component that wraps content on the screen, you can think about it as an invisible square or a rectangle (the equivalent to the "Div" tag in HTML) where you can put content such as text or images. By wrapping content in a View you can control it as a whole in the UI (their position for instance). This is how you can call it:

```html
<View>
  <Text>Hello world</Text>
  <Image source={require('./me.jpg')}></Image>
</View>
```

### Styling elements

Above we invoked components to make them appear on the screen, however, by default the components are not styled at all. What if we want the text to appear in bold, bigger, or in red color?

In React Native we can use a set of [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) rules to give the components in the screen the appearance we want. That way we can, for instance, make the text look bold, bigger or red.

So, how do you apply styling to the React Native components? there are two ways:

- One is you create a Javascript object that contains the set of style rules, then you associate the Javascript object to the component.
- The other way is you add the style rules inline to the component.

Styling through an object:

- First, create the object. We will be using a Javascript class that React Native provides specially for creating sets of style rule objects:

```javascript
var styles = StyleSheet.create({
  myCoolText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
```

- Above we're creating a Javascript variable called "styles" which points to the object we created containing the styles set (called "myCoolText") we want to use.

- Now let's use the styles set with a Text component:

```html
<Text style={styles.myCoolText}>Hello world</Text>
```

- What happened there is that we tell to the Text component what style rules we want to use. We did that by adding to the simplest component call (which is `<Text>Hello world</Text>`) the "style" attribute and we indicated it that the style set is "myCoolText" which is stored in the "styles" variable.

Inline styling:

- Given we have the text component:

```html
<Text>Hello world</Text>
```

- We add the inline style rules:

```html
<Text style={{ color: 'red', fontSize: '20', fontWeight: 'bold' }}>
```

- We're creating a Javascript object that contains the styling rules and we're passing it inline to the style attribute of the Text component.

## Setting up React Native

I'm going to show you how to setup the environment in Mac. The setup consist of three sections:

- Setup what is common for both platforms (iOS and Android)
- Setup what is required for iOS
- Setup what is required for Android.

### Common tools setup (for iOS and Android)

Install [homebrew](http://brew.sh) by opening a terminal and running:

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once you have installed Homebrew then install node.js and watchman by running these commands:

```
$ brew install node
$ brew install watchman
```

Last, given that we have node.js now we can install node packages (through the node package manager - npm). Let's install the react native command line:

```
$ npm install -g react-native-cli
```

### iOS environment setup

Make sure you have Xcode installed on your computer, if you don't have it, then go to [Xcode in the App store](https://itunes.apple.com/en/app/xcode/id497799835) and install it .

We are not going to use Xcode very much, but we need it so that we can use the iOS device emulators (iPhone or iPad) that it provides.

### Android environment setup

Download and install the [Android Studio](https://developer.android.com/studio/index.html).

Create the virtual device:

	$ android create avd -n react-native -t 1 -b x86 --skin 1080x1920 --device 'Nexus 5'

Run the virtual device:

	$ emulator -avd react-native

For more details about setting up React Native, you can check the [Facebook documentation](https://facebook.github.io/react-native/docs/getting-started.html).

### Creating the example app

Now that we have setup the environment, let's create a new React Native app. Run the following command in the terminal:

	$ react-native init MyCoolApp

If are wondering how we're running the "react-native" command, remember that we installed "react-native-cli" some steps above, thus we have access now to the "react-native" command.

What we're doing in the command above is to create a new React Native project called MyCoolApp.

## The example app's anatomy

Let's now move to the project folder :

	$ cd MyCoolApp

This is the list of files/folders in the MyCoolApp folder:

    index.android.js
    index.ios.js
    package.json
    node_modules/
    android/
    ios/

If you see there is an "index.android.js" and an "index.ios.js" file; each of those files has the content that will be displayed in each platform (Android and iOS respectively), thus if you need to display different content for each platform you can do it.

The file "package.json" contains the list of Node.js packages that our app depends on, whereas the "node_modules/" folder contains the actual files that compose the Node.js packages. React Native is itself a Node.js package.

Last, the "android/" and "ios/" folders contain the necessary and resulting files for compiling the application to any of those platforms.

### Taking a look at the example app file

Let's take a look at the "index.ios.js" file content. This way we can see one of the most basic implementations for building a one-screen app for iOS:

```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class MyCoolApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...
});

AppRegistry.registerComponent('MyCoolApp', () => MyCoolApp);
```

In the beginning of the file:

```
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
```

The necessary classes (React Native implements ES6 through [Babel](https://babeljs.io)) from the 'react' and 'react-native' packages are loaded. As you see "Text" and "View" are being loaded which will be called below to show content in the UI.

Moving on to the next part:

```javascript
class MyCoolApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}
```

We're creating a Javascript class "MyCoolApp" of type Component with the lines:

```javascript
class MyCoolApp extends Component {
  ...
}
```

Generally, in React Native everything is a component, and components can contain other components (as we can see in the code above, where MyCoolApp contains a View and many Text components).

Moving on we see the following code within the MyCoolApp component:

```javascript
render() {
  return (
    ...
  );
}
```

That's the "render" function. The way a React Native components work is defined by the functions it has defined in it. The "render" function is a mandatory function for any component, it tells the component how it will be rendered in the UI. It's important to notice that the "render" function needs to call the "return ()" expression, otherwise nothing is rendered to the screen.

Let's check what the MyCoolApp component will actually render:

```html
<View style={styles.container}>
  <Text style={styles.welcome}>
    Welcome to React Native!
  </Text>
  <Text style={styles.instructions}>
    To get started, edit index.ios.js
  </Text>
  <Text style={styles.instructions}>
    Shake or press menu button for dev menu
  </Text>
</View>
```

As you can see it's going to render a View containing a set of different texts (such as "Welcome to React Native!"). As you see the View and Text components are being styled by the styling rules set passed in the "style" attribute (`style={styles.container}` for example).

Moving on, we see the next section of the file is where the styles are defined.

```javascript
const styles = StyleSheet.create({
  ...
});
```

Last, we have the line where the application component is registered, this way React Native knows this is the main app's component:

```javascript
AppRegistry.registerComponent('MyCoolApp', () => MyCoolApp);
```

### Running the app

Now that we know what composes the example screen generated by default, let's run the app and see how it looks on iOS. In the terminal run the command to run the app in iOS:

    $ react-native run-ios

That should open the iOS emulator and you should see the app running as below:

  ![React native default](/system/comfy/cms/files/files/000/000/232/original/react_native_default_screen.png)

Great! There you have, we have a basic example of a one-screen app running on iOS (if you want to run it on Android run: `$ react-native run-android`).


## Conclusion

We've covered the basics of React Native. At this point, you may feel comfortable to start playing with React Native, which is great. Start experimenting with it!

In a coming post, I'll be talking about some other features in React Native such as properties, dynamic content in the render function, and state variables. Also, I'll show you how to build a HackerNews client with React Native.

Feel free to throw any comment/question you have. Thanks!
