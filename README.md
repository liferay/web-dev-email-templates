# lrdcom-email-builder
A build system for building and testing robust customized email components

## Table of Contents
1. [Getting Started](#getting-started)
2. [How the System Works](#how-it-works)

### Getting Started

First time?

Install all [npm](https://www.npmjs.com/) dependencies:
```
npm install
```

### Start the Build System

Once all npm dependencies are installed, run:
```
gulp
```

to start the build system.

*Optional: Install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) Chrome extension*

### How the System Works

![Email Builder Architecutre](https://github.com/phillipchan2/lrdcom-email-builder/blob/master/assets/Email%20Builder%20Architecture.png?raw=true"Logo Title Text 1")

The system uses gulp to do a number of things to make building and testing email components easy.

All you need to do is:
- Write your markup
- Write your styles

In turn, gulp will:
- Inline all css for components
- Compile SASS
- Include components into a test page
- Build component test page
- Listen for any changes and update components accordingly.

### The Base

`/src/base/`
The base is used to create a code environment as close to Hubspot as possible so that when component are being built, it should reflect what you see on Hubspot.com. what base archictecture for emails. This should include all code that Hubspot uses. 

### Global Styles
`/src/styles`
This will contain global styles that will apply to each component. `main.css` is the final file that will be included in every component.

### Components
`/src/base/components`
Components are the things being imported to Hubspot. For the developer, all we have to do is 1) write the markup 2) write the styles. Gulp will in turn, 1) inline styles 2) put it in the Hubspot base styles 3) apply themes to it 4) produce a version of it `test.html` to be able to seen in the browser for initial testing and then imported into Litmus for testing.

#### Feature List
- Need to have global theming at component level
- Need to accomodate for HS variables and structure
- Build command (with yeoman?) to create new components.

