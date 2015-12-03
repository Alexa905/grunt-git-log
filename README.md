# git_log

>

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-log --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-log');
```

## The "git_log" task

### Overview

In your project's Gruntfile, add a section named `git_log` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  git_log: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.fields
Type: `Array`
Default value: `['hash', 'authorName', 'authorEmail', 'authorDate', 'subject']`

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  git_log: {
    myTaskName:{
        options: {
          callback:function(log){
            console.log(log) //    { files: [ 'src/creative/ads/bundle.json', 'src/creative/car-research/index.html' ],
                                     hash: 'abfe3a6de9323d3210d4095699b09a48510ddff3',
                                     authorName: 'Name Surname',
                                     authorEmail: 'author@email.com',
                                     authorDate: '2015-12-03 03:11:41 +0300',
                                     subject: 'New changelist' }
          }
        },
    }
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  git_log: {
    options: {
      from: 'origin/master',
      to: 'HEAD',
    },
    myTaskName:{
      options: {
        fields: ['authorEmail'],
        callback:function(log){
          console.log(log) // { files: [ 'src/edm/creative/ads/cspot/bundle.json' ],
                                authorEmail: 'author@email.com'}
          }
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_


Options

options.prop

Type: String Default value: 'git_log.<target name>.result'.

The grunt property in which to store the results.

options.callback

Type: Function Default value: none.

A callback function to call with the log results.
