# lrdcom-email-builder
A build system for building and testing robust customized email components

### Starting for the first time

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
- Listen for any changes


