# Density Labs website 

## Overview

This is the project to build the static website for Density Labs, it's created by GatsbyJS.

GatsbyJs is a React-based open-source framework for creating websites and apps.
GatsbyJS provides to development teams an open source frontend framework for creating dynamic, optimized websites and a cloud platform for delivering them on a blazing fast edge network.

Through this app we can:
- Manage blog posts on our website.
- Manage team members information.
- Manage information displayed on the website.
- Manage Uses cases information

## Requirements
- node version 12.13.1 
- yarn latest version
- manage version manager (optional) 

## How to Install 
- Install the project
```
git clone git@github.com:densitylabs/densitylabs-gatsby.git
```
-  move to the project folder
```
cd densitylabs-gatsby
```
- Install the Gatsby CLI
```
# install the Gatsby CLI globally
npm install -g gatsby-cli
```
- install dependencies
```
yarn install 
```

## How to Use it

### Development mode
```
gatsby develop
```
### Production mode
- create a build 
```
gatsby build
```
- Visualize website as production
```
gatsby serve 

```
## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── yarn.lock

  1.  **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.  
  
  2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser), like your site header, or a page template. “Src” is a convention for “source code”.
  
  3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.
  
  4.  **`.prettierrc`**: This is a configuration file for a tool called [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code consistent.
  
  5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.
  
  6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).
  
  7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.
  
  8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.
  
  9.  **`LICENSE`**: Gatsby is licensed under the MIT license.
  
  10.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won’t change this file directly).
  
  11.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.
  
  12.  **`README.md`**: A text file containing useful reference information about your project.
  
  13.  **`yarn.lock`**: [Yarn](https://yarnpkg.com/) is a package manager alternative to npm. You can use either yarn or npm, though all of the Gatsby docs reference npm.  This file serves essentially the same purpose as `package-lock.json`, just for a different package management system.