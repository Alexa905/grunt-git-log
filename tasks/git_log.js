/*
 * git_log
 * https://github.com/Alexa905/grunt-git-log
 *
 * Copyright (c) 2015 Tatyana Alexeenkova
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {

    grunt.registerMultiTask('git_log', 'Get log from last commits', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            from: 'HEAD^',
            to: 'HEAD',
            prop: 'git_log.' + this.target + '.result',
            fields: ['hash', 'authorName', 'authorEmail', 'authorDate', 'subject']
        });

        var done = this.async();
        var fields = {};
        var prettyFormat;
        var SEPARATOR = '--log-separator--';
        var FORMATSEPARATOR = '--format-separator--';
        var fieldsMap = {
            hash: '%H',
            abbrevHash: '%h',
            treeHash: '%T',
            abbrevTreeHash: '%t',
            parentHashes: '%P',
            abbrevParentHashes: '%P',
            authorName: '%an',
            authorEmail: '%ae',
            authorDate: '%ai',
            authorDateRel: '%ar',
            committerName: '%cn',
            committerEmail: '%ce',
            committerDate: '%cd',
            committerDateRel: '%cr',
            subject: '%s',
            body: '%B'
        };

        options.fields.forEach(function (field) {
            if (fieldsMap[field]) {
                fields[field] = fieldsMap[field];
            }
            else {
                grunt.log.warn('Unexpected field: ' + field);
            }
        });

        prettyFormat = JSON.stringify(fields);

        grunt.util.spawn({
            cmd: 'git',
            args: ['log', options.from + '..' + options.to, '--pretty=format: ' +
            SEPARATOR + prettyFormat + FORMATSEPARATOR, '--name-only'],
            opts: {}
        }, function (err, result) {

            if (err) {
                grunt.fail.fatal('Error running git log. Error: ' + err);
                return;
            }

            function _getFiles(log) {
                return log.split('\n').filter(function (item) {
                    return item.trim();
                });
            }

            function parseLogs(str) {
                var logs = str.trim().split(SEPARATOR);
                logs.shift();
                return logs.map(function (log) {
                    var obj = {};
                    var format = JSON.parse(log.split(FORMATSEPARATOR)[0]);
                    obj.files = _getFiles(log.split(FORMATSEPARATOR)[1]);
                    Object.keys(format).forEach(function (key) {
                        obj[key] = format[key];
                    });
                    return obj;
                });
            }

            var logs = parseLogs(result.stdout);

            if (options.prop) {
                grunt.config.set(options.prop, logs);
            }

            if (typeof options.callback === 'function') {
                options.callback(logs);
            }
            done();

        });

    });

};
