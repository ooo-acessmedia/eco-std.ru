'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var deployServer = '31.31.196.102',
        deployFolder = '',
        liveReloadFolder = 'http://eco-std.ru/';

    grunt.initConfig({
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/templates/css',
                    src: ['assets/templates/main-new.css'],
                    dest: 'assets/templates/main-new.css',
                    ext: '.css'
                }]
            },
            options: {
                keepSpecialComments: 0
            }
        },

        less: {
            develop: {
                options: {
                    paths: ['assets/templates'],
                    relativeUrls: true,
                    modifyVars: {}
                },
                files: {
                    'assets/templates/css/main-new.css': 'assets/templates/less/main.less'
                }
            },

            production: {
                options: {
                    paths: ['assets/templates'],
                    relativeUrls: true,
                    plugins: [
                        (new (require('less-plugin-clean-css'))({}))
                    ],
                    modifyVars: {}
                },
                files: {
                    'assets/templates/css/main-new.css': 'assets/templates/less/main.less'
                }
            }
        },

        'ftp-deploy': {
            css: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/css/',
                dest: 'www/eco-std.ru/assets/templates/css/',
                exclusions: ['assets/templates/css/owl.min.less', 'assets/templates/css/fancybox.min.less',
                    'assets/templates/css/bootstrap.min.less', 'assets/templates/css/boilerplate.min.less']
            },

            js: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/js/',
                dest: 'www/eco-std.ru/assets/templates/js/',
                exclusions: ['jquery.fancybox.min.js', 'jquery-1.12.0.min.js', 'owl.carousel.min.js']

            },

            images: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/img/',
                dest: 'www/eco-std.ru/assets/templates/img/'
            },

            'js-minishop': {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/components/minishop2/js/web/',
                dest: 'www/eco-std.ru/assets/components/minishop2/js/web/'
            }

        },

        uglify: {
            production: {
                files: {
                    'assets/templates/js/main.min.js': ['assets/templates/js/main.js'],
                    'assets/templates/js/ajaxform.js': ['assets/templates/js/ajaxform.js'],
                    'assets/components/minishop2/js/web/default.js': 'assets/components/minishop2/js/web/default.js'
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },

                files: [{
                    expand: true,
                    cwd: 'assets/templates/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/templates/img'

                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 10']
            },
            dist: {
                files: {
                    'assets/templates/css/main-new.css': 'assets/templates/css/main-new.css'
                }
            }
        },

        watch: {
            css: {
                files: ['assets/templates/less/**/*.less'],
                tasks: ['less:develop', 'autoprefixer', 'ftp-deploy:css'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            },
            js: {
                files: ['assets/templates/js/main.js'],
                tasks: ['ftp-deploy:js'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            },

            'grunt-js': {
                files: ['gruntfile.js'],
                tasks: ['watch'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);

    // Production
    grunt.registerTask('production', ['uglify:production', 'ftp-deploy:js', 'less:production', 'ftp-deploy:css',
        'imagemin', 'ftp-deploy:images']);

    // Production without images
    grunt.registerTask('production-wimages', ['uglify:production', 'ftp-deploy:js', 'less:production', 'ftp-deploy:css']);

    // Production for minishop2
    grunt.registerTask('production-minishop', ['uglify:production', 'ftp-deploy:js', 'ftp-deploy:js-minishop',
        'less:production', 'ftp-deploy:css', 'imagemin', 'ftp-deploy:images']);

};
