# lrdcom-email-builder
#### A build system for building and testing robust customized email components in Hubspot

## Table of Contents
1. [Getting Started](#getting-started)
    - [First Time](#first-time)
    - [Creating a New Component](#creating-a-new-component)
    - [Watching for Changes](#watching-for-changes)
    - [Send a Component to Test](#send-a-component-to-test)
    - [Transferring to Hubspot](#transferring-to-hubspot)
2. [How the System Works](#how-it-works)
    - [Overview](#overview)
    - [Inky](#inky)
    - [Hubspot Email Settings](#hubspot-email-settings)
    - [Live Reload](#live-reload)
  
3. 

## Getting Started

### First Time

Install all [npm](https://www.npmjs.com/) dependencies: `npm install`

### Create a New Component

```
gulp new --name [component]
```

This will create a new component in `src/components`. In it are:
```
/components
    /[component-name]
        src.html
        styles.css
```


`src.html` is where the HTML for component
`styles.css` are styles specific for that component
`test.html` is your component with hubspot styles and grid
`dist.html` is the final product of your component

Oh and congrats, Gulp is now watching for changes. Any change you make to `src.html` and `styles.css` will reflect in `test.html` and `dist.html`.

### Watch for Changes

```
gulp
```

This will watch for all changes to any file and execute the proper workflow. 

### Send a Component to Test
Want to see your component in Litmus? 

```
gulp test --name [component]
```

### Transferring to Hubspot
Unfortunately, there's no way to automatically create components in Hubspot. So what you'll basically do is copy the contents of `dist.html` to your Custom Module. 

## How the System Works

### Overview

The purpose of the system is to 1) emulate hubspot's styling and grid system for design replication 2) make creating components easy and testable. 

With those two goals, this is how the build system works:

![Email Builder Architecture](https://github.com/phillipchan2/lrdcom-email-builder/blob/master/assets/Email%20Builder%20Architecture.png?raw=true"Logo Title Text 1")

What's what:
- **Hubspot Styles and Infrastructure** (`/src/base/`)
The base is used to create a code environment as close to Hubspot as possible so that when component are being built, it should reflect what you see on Hubspot.com. what base archictecture for emails. This should include all code that Hubspot uses. 
- **Global Email Styles** (`/src/styles`) - This will contain global styles that will apply to every component. `main.css` is the final file that will be included in every component.
- **Custom Components** (`/src/base/components`) - Where our collection of components go.

### Inky
[Inky](#https://foundation.zurb.com/emails/docs/inky.html) is a responsive framework for Emails from Zurb that is well-documented, supported, and robust. In any components, you can leverage any of the Inky syntax and it will spit out correct styling and HTML. Note: Don't rely so much on the Inky grid system as we are locked into Hubspot's grid system.

### Live Reload
[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) is a Chrome plugin that allows for auto reload when changes to a page are made. To leverage this during development...

1. Install the plugin
2. Allow for local URLs (Extensions -> Check "Allow Access to File URLs")
3. Run `gulp`
4. Check the Livereload Button in Chrome Toolbar (Make sure the dot is filled)

## To do List:
- <del>Auto create new components</del>
- <del>Build base with configs</del>
- <del>Auto test</del>
- <del>Need to have global theming at component level with SASS</del>
- Need to accomodate for HS variables and structure.
- Remove extraneous dependencies
- Test A-Z
- Get Litmus account
- <del>Get feedback about builder</del>
- <del>Set up Zurb scaffolding</del>
- <del>Output a `dist.html`</del>
- <del>Livereload certain components</del>
- <del>Get SASS for component level</del>
- Create video showing how it's done.
