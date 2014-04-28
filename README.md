# grunt-docco-dir

Grunt Docco plugin, extension.  

Docco takes a list of files and then generates documents based on all those files.  If two or more files have the same name
then docco overwrites one of the files.  

This plugin creates separate directories for the files based on the real directory. So if a file is in src/common/foo 
it will end up in a directory called src.common.foo. This will allow 2 or more files, with the same name, in different directories, 
 to get documentation generated for both with no issues.  This means you can have a widgets/Base.js and common/Base.js 
and neither will get overwritten.  This plugin also creates an actual index.html page. In a future version of this plugin, 
that index will be customizable.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-docco-dir --save-dev`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-docco-dir');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

Add the task config to the grunt initConfig block.

```
docco: {
  debug: {
    src: ['test/**/*.js'],
    options: {
      output: 'docs/'
    }
  }
}

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 0.3.3: Update to use latest official docco version
* 0.3.2: Update to use newer commit of development docco
* 0.3.1: Update to use #development docco - fixes several issues with multiple runs.
* 0.3.0: Removed dependency on python's pygments. Use latest libraries.
* 0.2.0: Early release, depended on python's pygments.

## License
Copyright (c) 2014 Joe Acosta et al
Licensed under the MIT license.
