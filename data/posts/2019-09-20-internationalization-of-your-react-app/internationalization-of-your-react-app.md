---
name: "Internationalization of Your React App"
date: "2019-09-20"
image: ./internationalization-of-your-react-app.jpg
keywords: "internationalization, i18n, language, translation, apps, manual, javascript, react, babel, macros, i18n-js"
author: "Fernando Vázquez Lara"
social_summary: "We'll discuss app internationalization for React apps using a manual approach, using the i18n package, and Babel macros package"
tags:
  - internationalization
  - i18n-js
  - babel
  - react
description: "We'll discuss app internationalization for React apps using a manual approach, using the i18n package, and Babel macros package"
---
One of the most common tasks for developers is  website/app localization. Having a website available in multiple languages means more of your users can happily navigate in their native language.

You can attract new users that speak a different language to your app or page, and thus expand your active users.

A popular approach to solve it  is using the **i18n** package _(an abbreviation for the word "internationalization")_  in JavaScript but we'll look into some alternatives using React.
</br></br>

## Manual Approach

The manual approach doesn't rely on external packages but on vanilla JavaScript.

First, let's create a dictionary:
```js
const dictionary = {
  es: {
    "hello_world" : "Hola Mundo"
  }
}
```
Then we can use a function to get the translation if it exists:
 ```js
function localize(locale, message) {
  if (dictionary[locale] && dictionary[locale][message]) {
    return dictionary[locale][message]
  }
  return message
}
```

The function needs to be exported so that it can be reused it anywhere in the app.
Then this is how we'll print the translation:
```jsx
<p>{localize("es", "hello_world")}</p>
 ```  
</br>

## I18n Approach

The I18n package helps to manage translations by loading them from dictionary files, so that they can be exposed in the JS code.

Let's install the I18n package via npm:
```bash
npm install i18n --save
```
Then we'll have to create the dictionary file, so that it can be consumed later by I18n. So, let's create it as a YAML file:
  ```yaml
en:
  hello_world: Hello World
es:
  hello_world: Hola Mundo
 ```
Now, let's load the locales and the dictionary file:
```jsx
import I18n from 'i18n';

i18n.configure({
  locales:['en', 'es'],
  directory: __dirname + '/locales'
});
```
Last, let's print the translation:
```jsx
<p>{I18n.t("hello_world")}</p>
```
For more details you can visit [this page]([https://www.npmjs.com/package/i18n](https://www.npmjs.com/package/i18n))  

</br>

## Babel Macros Approach
Using the Babel macros package we can integrate translations into React components. That way we can set the code to load the singular or plural translation automatically with a single keyword.

Let's install the Babel macros package:

```bash
npm install --save babel-plugin-macros
```
or
```bash
yarn add babel-plugin-macros
```

We will use the same content for dictionary file that we used in the previous example:
```js
const dictionary = {
  es: {
    "hello_world" : "hola mundo",
    "dog": "perro",
    "dogs": "perros"
  }
}
```
Then we'll import the `Trans` component from Macro:
```js
import { Trans } from "@lingui/macro"
```
Last, this is how we'll print the translation text:
```jsx
<Trans>hello_world</Trans>
```

We can also print plural translations. We just need to tell the component what keyword will be used when singular and when plural.
```jsx
import { Plural } from "@lingui/macro"
<Plural
  value={count}
  one="dog"
  other="dogs"/>
```
</br>

## Closing Thoughts

App Internationalization is an essential feature to reach a larger market and potential clients. To internationalize a React app my favorite approach is Babel macros because it provides a cleaner and intuitive syntax in my opinion, you can take advantage of components to use the features like plurals in your translations.

Are you planning to internationalize a React application? Let me know in the comments!
