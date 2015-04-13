var generators = require('yeoman-generator');

/* static functions
 * all library code should be put here.
 */
var YodyGenerator = generators.Base.extend({
	userInput: function() {
		var done = this.async();
		var prompts = [{
			type: 'input',
			name: 'name',
			message: 'Input the name of your webapp',
			default: this.appname
		},{
			type: 'checkbox',
			name: 'modules',
			message: 'Select which libraries you want included:',
			choices: [
				"Sass",
				"Jade",
				"Boostrap",
				"jQuery"
			]
		}];
		this.prompt(prompts,function(answers) {
			this.log(answers.modules);
			done();
		}.bind(this));
	},
	installBootstrap: function() {
	}
});


/* Steps of the Generator.
 * all functions here should be called from above.
 */
module.exports = YodyGenerator.extend({
	initializing: function () {
	},
	prompting: function() {
		this.userInput();
	},
	configuring: function() {
	},
	default: function() {},
	writing: function() {},
	conflicts: function() {},
	install: function() {},
	end: function() {}
});