// Generated on 2013-11-28 using generator-angular-component 0.2.3
'use strict';

module.exports = function (grunt) {

    // Configurable paths
    var yoConfig = {
        livereload: 35729,
        src: 'src',
        dist: 'dist'
    };

    // Livereload setup
    var lrSnippet = require('connect-livereload')({port: yoConfig.livereload});
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        yo: yoConfig,
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %>\n' +
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n'
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yo.dist %>/*',
                            '!<%= yo.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            app: {
                files: [
                    '<%= yo.src %>/{,*/}*.html',
                    '{.tmp,<%= yo.src %>}/{,*/}*.css',
                    '{.tmp,<%= yo.src %>}/{,*/}*.js'
                ],
                options: {
                    livereload: yoConfig.livereload
                }
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0' // Change this to '0.0.0.0' to access the server from outside.
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yoConfig.src)
                        ];
                    }
                }
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= yo.src %>/{,*/}*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true
            },
            server: {
                autoWatch: true
            }
        },
        ngmin: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['<%= yo.src %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.js'
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>',
                stripBanners: true
            },
            dist: {
                src: ['<%= yo.src %>/<%= pkg.name %>.js'],
                dest: '<%= yo.dist %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= yo.dist %>/<%= pkg.name %>.min.js'
            }
        },
        bump: {
            options : {
                files: ['package.json', 'bower.json'],
                commitFiles: ['package.json', 'bower.json'],
                updateConfigs: ['pkg', 'bower'],
                push: false
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'ngmin:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('patch', [
        'test',
        'bump-only:patch',
        'build',
        'bump-commit'
    ]);

    grunt.registerTask('minor', [
        'test',
        'bump-only:minor',
        'build',
        'bump-commit'
    ]);

    grunt.registerTask('major', [
        'test',
        'bump-only:major',
        'build',
        'bump-commit'
    ]);

    grunt.registerTask('default', ['build']);

};
