/*
* Copyright (c) 2015, Yahoo! Inc. All rights reserved.
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/*.js'],
      options: {
        scripturl: true,
        camelcase: true
      }
    },
    browserify: {
      standalone: {
        src: [ 'src/<%= pkg.name %>.js' ],
        dest: 'dist/<%= pkg.name %>.js',
        options: {
          browserifyOptions: {
            standalone: 'ContextParser'
          }
        }
      }
    },    
    mocha_istanbul: {
      target: {
        src: 'tests/unit',
        options: {
          coverage:true,
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    },
    clean: {
      all: ['xunit.xml', 'artifacts', 'coverage', 'node_modules'],
      buildResidues: ['xunit.xml', 'artifacts', 'coverage']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['clean:buildResidues', 'jshint', 'mocha_istanbul']);
  grunt.registerTask('dist', ['browserify'])
  grunt.registerTask('default', ['test', 'dist']);
};
