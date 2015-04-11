'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var YodyGenerator = yeoman.generators.Base.extend({
    var promptUser: function() {
        var done = this.async();

        console.log(this.yeoman);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.appDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    }
});

module.exports = YodyGenerator;