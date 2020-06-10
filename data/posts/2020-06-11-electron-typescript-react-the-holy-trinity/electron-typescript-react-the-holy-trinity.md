---
name: "Electron, TypeScript & React - The Holy Trinity"
date: "2020-06-11"
image: ./electron-typescript-react-the-holy-trinity.jpg
keywords: "typescript, electron, react, boilerplate"
author: Ivan Velasquez
social_summary: "Have you tried to integrate React, Typescript & Electron working together? In this blog post, I show you the way so you can start working to create powerful desktop applications."
tags:
  - typescript
  - electron
  - react
description: "Have you tried to integrate React, Typescript & Electron working together? In this blog post, I show you the way so you can start working to create powerful desktop applications."
---
During the past weeks I’ve been working on a project that involves getting Electron, TypeScript & React working together. When I started the project I did what every Sr. Software Engineer would do, I went to Google and typed “How to setup TypeScript, React & Electron”.  I was expecting find a solution on the first results but I didn’t find what I was looking for. After some research, many tabs on my browser and several attempts I was able to setup correctly my development environment.

I decided to create this blog post to share with you what I called The Holy Trinity.

## Project Setup
First of all you need to start your project by running
```
yarn init
```
or
```
npm init
```

After answering the questions that were prompted, it's time to install the dependencies that you need.

## Project structure.
This is the folder structure that I used, not sure if it is the best but it worked for me
```
webpack.config.js
tsconfig.json
package.json
src/
  assets/
  electron.ts
  index.tsx
  index.html
```
## Electron
Installing Electron is the easiest task, all what you need is to install the dependency and add it to your **package.json**
```
yarn add electron -D
```
You can corroborate that Electron was installed correctly by creating a **Hello World**, just create a new file **index.js**
```
const { app } = require('electron')

app.on('ready', () => {
  console.log('Hello world');
});
```
And then just run
```
electron index.js
```
## TypeScript
In order to setup TypeScript all what you need is just to install the dependencies
```
yarn add typescript -D
 ```

After that you need to write your **tsconfig.json**. This worked like a charm for me
```
{
  "compilerOptions": {
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es6", "dom"],
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": false,
    "target": "es5",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/*"],
    }
  },
  "exclude": [
    "**/*.spec.ts",
    "node_modules",
    "vendor",
    "public"
  ],
  "compileOnSave": false
}
```
This may change depending on your folder structure, I like to put all my code inside a src/ directory and I also wanted to avoid the relative path hell
```
import Component from '.../.../../../component';
```
So I just declared an absolute path
```
....
  "paths": {
      "@app/*": ["src/*"],
    }
...
```
## React
```
yarn add react react-dom
```
Given that you already installed TypeScript, you might want to install **@types/react** as well
```
yarn add @types/react @types/react-dom -D
```
You may noticed that you didn’t used the **-D** when you added **react** and **react-dom**, this is due to all your JSX is converted to a syntax similar to React.createElement and hence you would require your app to have React during run time as well.


## Webpack
You just installed The Holy Trinity dependencies but you still need to compile your TypeScript/React code and generate a bundle file that Electron can read, that's a task for Webpack.

You just need to install a “few” dependencies, you probably won’t need some of them.
```
yarn add webpack webpack-cli copy-webpack-plugin css-loader file-loader postcss-loader sass-loader style-loader ts-loader url-loader html-webpack-plugin precss autoprefixer -D
```
Then you must configure Webpack, this is the  **webpack.config.js** that worked for me but it might change depending on your project folder structure.
```
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = [
  {
    mode,
    entry: {
      electron: path.resolve('./src/electron.ts'),
    },
    target: 'electron-main',
    node: false,
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      alias: {
        '@app': path.resolve(__dirname, 'src/')
      }
    }
  },
  {
    mode,
    node: false,
    entry: {
      index: path.resolve('./src/index.tsx'),
    },
    target: 'electron-renderer',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: {
            test: /\.jsx?$/
          },
          use: ['babel-loader', '@svgr/webpack', 'url-loader']
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'url-loader'
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      alias: {
        '@app': path.resolve(__dirname, 'src/')
      }
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CopyWebpackPlugin([
        { from:'src/assets',to:'assets' }
      ])
    ]
  },
]
```
If you are familiarized with Electron, you might know that it has a **main** and **render process**, so I decided that the best would be writing a configuration for each process.

We need to specify an entry point and a target for each process.

**Main process**
```
    entry: {
      electron: path.resolve('./src/electron.ts'),
    },
    target: 'electron-main',
```
**Render process**
```
    entry: {
      index: path.resolve('./src/index.tsx'),
    },
    target: 'electron-renderer',
```
That's it!!! You should be able to compile your TypeScript code and execute your Electron application by just running:
```
./node_modules/webpack/bin/webpack.js --config ./webpack.config.js
electron ./build/electron.js"
```
The best would be write this as **scripts** in the **package.json**

## Conclusions
Setting up a development environment is not easy, it always depends on what you need. There is always the option to look for a boilerplate application and modify according to your needs. I have found that this small configuration worked perfect to me but you will need to add/remove some dependencies if you don’t need them.

You can find a boilerplate using this configuration at https://github.com/densitylabs/typescript-react-electron-boilerplate

Did you already have experience with The Holy Trinity? Would you change or add something else? Let me know!
