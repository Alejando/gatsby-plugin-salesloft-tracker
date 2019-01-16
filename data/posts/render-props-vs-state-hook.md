---
name: Render Props vs State Hook
date: "2018-12-05"
image: ./render-props-vs-state-hook-picture.png
description: Render prop refers to a technique used for sharing code between React components using a prop whose value is a function.
tags:
  - react
  - render-prop
author: Ivan Velasquez
---
The term [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) refers to a technique used for sharing code between React components using a prop whose value is a function.

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

Let's create a component example that will help us to show/hide elements.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTo } from 'lodash';
class VisibilityHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayed: defaultTo(props.initialState, false),
    };
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide() {
    this.setState({
      isDisplayed: false,
    });
  }

  show() {
    this.setState({
      isDisplayed: true,
    });
  }

  render() {
    return this.props.children({
      ...this.state,
      hide: this.hide,
      show: this.show,
    });
  }
}

VisibilityHelper.propTypes = {
  initialState: PropTypes.bool,
  children: PropTypes.func.isRequired,
};
export default VisibilityHelper;
```

How can I use this component?

```javascript
import VisibilityHelper from '..somewhere-inside-your-app';
const ButtonComponent = () =>  (
    <VisibilityHelper>
      {
        ({
           isDisplayed,
            hide,
            show
        }) => (
          <div>
            {
               isDisplayed &&
               <p onClick={hide}>Click to hide</p>
            }
            <button onClick={show}>Click to display</button>
          </div>
        )
      }
    </VisibilityHelper>
 );
```

This ButtonComponent will render a simple button that once clicked will change the isDisplayed property internally used on VisibilityHelper and show the hidden content.

I found render props useful in the kind of situation where we have a stateless component and there is no need to write a whole class.

## React Hooks
According to the documentation, "Hooks are a new feature proposal that lets you use state and other React features without writing a class. They're currently in React v16.7.0-alpha and being discussed in an [open RFC](https://github.com/reactjs/rfcs/pull/68)."


```javascript
import { useState } from 'react';

const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

As soon I started reading a feature's specification I knew exactly where to implement it on my react apps and I decided to write a blog post to share my knowledge

## Replace render props with React Hooks.
Let’s rewrite the ConfirmationButton component replacing the VisibilityHelper with React Hooks.

```javascript
import { useState } from 'react';
const ConfirmationButton = () => {
  const [isDisplayed, show] = useState(false);

  return (
    <div>
      {
        isDisplayed &&
        <p onClick={() => show(false)}>Click to hide</p>
      }
      <button onClick={() => show(true)}>Click to display</button>
    </div>
  );
}
```

## Conclusion
React Hooks is not a replacement for Render props, there are more things that you can do with them, but in this case I think hooks is a good feature to use state properties inside a stateless component.

