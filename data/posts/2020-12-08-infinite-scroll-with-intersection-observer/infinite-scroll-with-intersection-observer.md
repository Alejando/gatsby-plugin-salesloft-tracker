---
name: "Infinite Scroll with Intersection Observer"
date: "2020-12-08"
image: ./infinite-scroll-with-intersection-observer.jpg
keywords: "intersection-observer, intersectionobserver-polyfill, infinite-scroll, lazy-loading, react-app, react-js, javascript"
author: Andrea Olarte
social_summary: "Are you looking for a way to implement an infinite scroll or a lazy loading approach to your project? We will learn about Intersection Observer and use it to accomplish that in a very simple way."
tags:
  - javascript
  - infinite-scroll
  - react
  - intersection-observer
description: "Are you looking for a way to implement an infinite scroll or a lazy loading approach to your project? We will learn about Intersection Observer and use it to accomplish that in a very simple way."
---

Some days ago while I was looking for options to easily perform actions based on and triggered by the user’s current position in a web application, I found the Intersection Observer Web API.

I was very impressed because it is a very simple and native Web API, which I had never heard of before, that has a lot to offer and is very useful for many broad purposes like implementing lazy-loading or an infinite scroll.

The Intersection Observer is an asynchronous function that allows us to have visibility of the changes in an intersection between a root element and a target one.

You provide a callback to be executed when those changes in the intersection are detected and a set of options providing the root element or viewport along with other configuration to _customize_ your observation, and attach the observer to the target element:

``` js
let observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
```

To have a better understanding, let’s create an _InfiniteScroll_ React component that will display a list of items and will be loading and adding more groups of them every time the user scrolls down and reaches the bottom of the current list. First, I’ll create an _IntersectionObserverHandler_ component that will only keep the Intersection Observer logic I need so it could be easily reused:

``` jsx
import React from 'react';
import PropTypes from 'prop-types';

class IntersectionObserverHandler extends React.Component {
  componentDidMount() {
    if(!this.target) {
      console.error('Unexpected: "target" element was not provided);
      return;
    }
    const options = {
      root: this.root ? this.root : null,
      rootMargin: '10%',
      threshold: 1.0,
      ...this.props.options
    };
    this.observer = new IntersectionObserver(this.handleObserver.bind(this), options);
    this.observer.observe(this.target);
  }

  handleObserver(entries, observer) {
    this.props.onIntersection && this.props.onIntersection(entries, observer);
  }

  render() {
    return this.props.children({
      root: node => this.root = node,
      target: node => this.target = node
    });
  }
}

IntersectionObserverHandler.propTypes = {
  children: PropTypes.func.isRequired,
  options: PropTypes.object,
  onIntersection: PropTypes.func
};

export default IntersectionObserverHandler;
```

As you can see, the options given to the observer is an object containing `root`, `rootMargin`, and `threshold`:

- The root should be an element, ancestor of the target, which will be used as the bounding box in which the intersection with the target will be observed. If not set or set to `null` it will default to the browser viewport. In the example, if a root is provided to the handler, that will be taken, otherwise, it will take the default.

- The rootMargin option is used to decrease or increase the root bounding box sizes for the intersection.

- Threshold refers to the percentage area the target should take into the root to execute the observer’s callback. The IntersectionObserverHandler will set a default of 1.0 which means that until the whole target element is visible in the root, the callback will be invoked. It can also be an array of numbers to run the callback on each of those represented percentages.

The callback retrieves an array of entries representing an intersection change, and the observer. An entry contains a set of useful properties that are used to know about the intersection and most of the time to run your logic, those are `boundingClientRect`, `intersectionRatio`, `intersectionRect`, `isIntersecting`, `rootBounds`, `target`, `time`. In this case, we will be using `isIntersecting` to load more items if it returns true, that is, the target is currently intersecting or getting into the root element.

Also, notice how in the snippet above we’re rendering the `root` and `target` props that are references to be used later to set those roles in the observer.

Now let’s create an _InfiniteScrollList_ component in which to implement the observer handler:

``` jsx
const InfiniteScrollList = ({ items }) => {
  const handleObserver = (entries) => {
    if(entries[0].isIntersecting) {
      // Load next groups of items here to add to the infinite list
    }
  }

  return (
    <IntersectionObserverHandler
      onIntersection={(entries) => handleObserver(entries)}
      options={{
        threshold: 0.5
      }}
    >
      {({ target }) => (
        <div>
          {items.map(item => <Item item={item} />)}
          <div ref={target}>
            <Spinner/>
          </div>
        </div>
      )}
    </IntersectionObserverHandler>
  );
};
```

As you can see, we attached our callback function through the `onIntersection` prop of the _IntersectionObserverHandler_, and also define a threshold of 0.5 that will overwrite the default 1.0. The last missing piece is to bind the provided `target` reference to the element that will take that place. In the example, it will be attached to a div containing a Spinner component that will show at the end of the list and will get out of the view after the callback is run and more items are added. The `root` reference was not set since want to have the default browser viewport as the root element.

Now, this API is not only really cool but also has high [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Browser_compatibility), including Edge +15 and Safari +12.1, but if we want to increase that even more, being able to support it in the latest Internet Explorer versions, for example, there is a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) that we can implement.

Let’s add the dependency to the project, in this case, we do it through yarn:
`yarn add intersection-observer`

We then use it in the _IntersectionObserverHandler_ component making a small change in the observer declaration like so:

``` jsx
...
import IntersectionObserverPolyfill from 'intersection-observer';

class IntersectionObserverHandler extends React.Component {
  componentDidMount() {
    ...
    this.observer = !('IntersectionObserver' in window)
      ? new IntersectionObserverPolyfill(this.handleObserver.bind(this), options)
      : new IntersectionObserver(this.handleObserver.bind(this), options);
    this.observer.observe(this.target);
  }
  ...
}
```

With this, now you are supported in more browsers and older versions like IE +7 and Safari +6.

And that’s it! You can easily implement it for infinite scrolling, lazy-loading, animations based on user viewport position, among other things without making use of more troublesome and complex handlers or DOM methods like `getBoundingClientRect`, with such a **wide** support.

Was this useful? Have you used this or handled it differently? Let me know in the comments below!

[Paper vector created by freepik - www.freepik.com](https://www.freepik.com/vectors/paper)