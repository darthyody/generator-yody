'use strict';
var util = require('util');
var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var glob = require('glob');

var YodyGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

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
    },
    scaffoldFolders: function() {
        fs.mkdir('app');
        fs.mkdir('app/css');
        fs.mkdir('app/sections');
        fs.mkdir('build');
    },
    copyMainFiles: function(){
        this.copy("_footer.html", "app/footer.html");
        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_package.json", "package.json");
        this.copy("_main.css", "app/css/main.css");    
     
        var context = { 
            site_name: this.appName 
        };
     
        this.template("_header.html", "app/header.html", context);
    },
    generateDemoSection: function() {
        if (this.addDemoSection) {
            var context = {
                content: "Demo Section",
                id: this._classify("Demo Section")
            }

            var fileBase = Date.now() + "_" + this._.underscored("Demo Section");
            var htmlFile = "app/sections/" + fileBase + ".html";
            var cssFile = "app/css/" + fileBase + ".css";

            this.template("_section.html", htmlFile, context);
            this.template("_section.css", cssFile, context);
        }
    }, 
    generateMenu: function() {
        var menu = this.read("_menu.html");

        var t = '<a><%= name %></a>';
        var files = glob("app/sections/*.html");

        for (var i = 0; i < files.length; i++) {
            var name = this._.chain(files[i]).strRight("_").strLeftBack(".html").humanize().value();

            var context = {
                name: name, 
                id: this._._classify(name)
            }

            var link = this.engine(t, context);
            menu = this.append(menu, "div.menu", link);
        }

        this.write("app/menu.html", menu);
    },
    runNpm: function() {
        var done = this.async();
        this.npmInstall("", function(){
            console.log("\nEverything is Setup!!\n");
            done();
        });
    }
});

module.exports = YodyGenerator;