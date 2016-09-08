# Liferay.com Email Component Builder
A build system for building and testing robust customized email components in Hubspot.

The purpose of the system is to 1) emulate hubspot's styling and grid system for design replication 2) make creating components easy and testable. 

## Table of Contents
1. [Getting Started](#getting-started)
2. [Commands You Need to Know](#commands-you-need-to-know)
    - [1) Creating a New Component](#creating-a-new-component)
    - [2) Watching for Changes](#watching-for-changes)
    - [3) Send a Component to Test](#send-a-component-to-test)
    - [4) Transferring to Hubspot](#transferring-to-hubspot)
2. [How the System Works](#how-it-works)
    - [Overview](#overview)
    - [Email Global Styles](#email-global-styles)
    - [Inky](#inky)
    - [Hubspot Email Settings](#hubspot-email-settings)
    - [Live Reload](#live-reload)

## Getting Started

The gateway to do everything: 

1. Clone repo
2. Install all [npm](https://www.npmjs.com/) dependencies with `npm install` from your terminal in the root directory.

You're ready to go!

## Commands You Need to Know
To create, update, test, and transfer custom and bullet-proof email components to Hubspot, these are the commands that you'll need to know.

### 1) Create a New Component
When you need to make a new email component:

```
gulp new --name [component]
```

This will create a new component in `src/components`. In it are:
```
/components
    /[component-name]
        src.html
        styles.css
        test.html
        dist.html
```

What these do:

Stuff you edit:

- `src.html` is where the HTML for component
- `styles.css` are styles specific for that component

Stuff that's outputted (aka: don't edit these):

- `test.html` is your component with hubspot styles and grid system. **View this in browser to test to see how your component looks in multiple widths.**
- `dist.html` is the final product of your component

Oh and congrats, *Gulp is now watching for changes*. Any change you make to `src.html` and `styles.css` will reflect in `test.html` and `dist.html`.

### 2) Watch for Changes
Want to make changes to any component? Run this command and the application will watch for all changes to any file and process produce `test.html` and `dist.html`

```
gulp
```

Omg, magic.

### 3) Send a Component to Test
Want to see your component tested in Litmus?

```
gulp test --name [component]
```

Omg, magic.

### 4) Transferring to Hubspot
Unfortunately, there's no way to automatically create components in Hubspot. So what you'll basically do is copy the contents of `dist.html` to your Custom Module. This is similar to relationship between the lrdcom repo and templates in Liferay.com

Not magic...

## How the System Works
Here's some details to understand how the system works and features you may want to leverage.

### Overview

This is how the build system works:

![Email Builder Architecture](https://github.com/phillipchan2/lrdcom-email-builder/blob/master/assets/Email%20Builder%20Architecture.png?raw=true"Logo Title Text 1")

What's what:
- **Hubspot Styles and Infrastructure** (`/src/base/`)
The base is used to create a code environment as close to Hubspot as possible so that when component are being built, it should reflect what you see on Hubspot.com. what base archictecture for emails. This should include all code that Hubspot uses. 
- **Global Email Styles** (`/src/styles`) - This will contain global styles that will apply to every component. `main.css` is the final file that will be included in every component.
- **Custom Components** (`/src/base/components`) - Where our collection of components go.

### Email Global Styles
In `/src/styles` you'll find global styles for all components.

- This allows global theming and styling as it will write css for every component. 
- Supports SASS. 
- If you have `gulp` running, it will automagically process and update all components on save. 

### Inky
[Inky](https://foundation.zurb.com/emails/) is a responsive framework for Emails from Zurb that is well-documented, supported, and robust. Inky is fully integrated in this build system. 

For any components, you can leverage any of the Inky syntax and it will spit out correct styling and HTML. Note: Don't rely so much on the Inky grid system as we are locked into Hubspot's grid system.

[Read Inky Docs](https://foundation.zurb.com/emails/docs/inky.html)

### Live Reload
[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) is a Chrome plugin that allows for auto reload when changes to a page are made. To leverage this during development...

1. Install the plugin
2. Allow for local URLs (Extensions -> Check "Allow Access to File URLs")
3. Run `gulp`
4. Check the Livereload Button in Chrome Toolbar (Make sure the dot is filled)

## To Do Feature List:
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
- Get SASS for component level
- Create video showing how it's done.
