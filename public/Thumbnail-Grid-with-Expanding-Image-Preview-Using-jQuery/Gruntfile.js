module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            production: {
                files: {
                    'js/jquery.imagelistexpander.min.js' : ['js/jquery.imagelistexpander.js']
                }
            }
        },
        cssmin: {
            production: {
                files: {
                    'css/imagelistexpander.min.css' : ['css/imagelistexpander.css']
                }
            }
        },
        less: {
            development: {
                files: {
                    "css/imagelistexpander.css": "less/imagelistexpander.less",
                    "css/example.css": "less/example.less"
                }
            },
            production: {
                files: {
                    "css/imagelistexpander.css": "less/imagelistexpander.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['less:production', 'cssmin:production', 'uglify:production']);

};