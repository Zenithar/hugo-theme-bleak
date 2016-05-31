module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            'cssSrcDir': 'src/sass',
            'cssTargetDir': 'css',
            'jsSrcDir': 'src/js',
            'jsTargetDir': 'js',
            'jsDependencies': [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/history.js/scripts/bundled/html4+html5/jquery.history.js',
                'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                'bower_components/masonry/dist/masonry.pkgd.min.js',
                'bower_components/fitvids/jquery.fitvids.js',
                'bower_components/highlightjs/highlight.pack.min.js',
                'bower_components/nprogress/nprogress.js',
                'src/js/vendor/gist-embed.min.js'
            ],
            'cssDependencies': [
                'bower_components/normalize.css/normalize.css',
                'bower_components/highlightjs/styles/default.css',
                'bower_components/nprogress/nprogress.css'
            ]
        },
        copy: {
            dev: {
                files: [{
                    dest: 'static/fonts/',
                    src: '*',
                    cwd: 'src/fonts/',
                    expand: true
                }]
            },
            dist: {
                files: [{
                    dest: 'static/fonts/',
                    src: '*',
                    cwd: 'src/fonts/',
                    expand: true
                }]
            }
        },
        clean: {
            dist: ['static']
        },
        sass: {
            dev: {
                options: {
                    sourceMaps: true
                },
                files: {
                    'static/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMaps: false
                },
                files: {
                    'static/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
                }
            }
        },
        cssmin: {
            dev: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1,
                    sourceMap: true
                },
                files: {
                    'static/<%=  config.cssTargetDir %>/dependencies.css': [
                        '<%=	config.cssDependencies %>'
                    ]
                }
            },
            dist: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1,
                    sourceMap: false
                },
                files: {
                    'static/<%= config.cssTargetDir %>/dependencies.css': [
                        '<%= config.cssDependencies %>'
                    ]
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            files: {
                src: 'static/<%=  config.cssTargetDir %>/*.css'
            }
        },
        uglify: {
            dev: {
                files: {
                    'static/<%= config.jsTargetDir %>/script.js': [
                        '<%= config.jsSrcDir %>/**/*.js'
                    ],
                    'static/<%= config.jsTargetDir %>/dependencies.js': [
                        '<%= config.jsDependencies %>'
                    ]
                }
            },
            devlight: {
                files: {
                    'static/<%= config.jsTargetDir %>/script.js': [
                        '<%= config.jsSrcDir %>/**/*.js'
                    ]
                }
            },
            dist: {
                files: {
                    'static/<%= config.jsTargetDir %>/script.js': [
                        '<%= config.jsSrcDir %>/**/*.js'
                    ],
                    'static/<%= config.jsTargetDir %>/dependencies.js': [
                        '<%= config.jsDependencies %>'
                    ]
                }
            }
        },
        watch: {
            css: {
                files: '<%=  config.cssSrcDir %>/**/*.scss',
                tasks: ['sass:dev', 'copy:dev', 'postcss']
            },
            js: {
                files: '<%=  config.jsSrcDir %>/**/*.js',
                tasks: ['uglify:devlight']
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        'cssmin:dist',
        'postcss',
        'copy:dist',
        'uglify:dist'
    ]);
    grunt.registerTask('default', [
        'sass:dev',
        'cssmin:dev',
        'postcss',
        'copy:dev',
        'uglify:dev',
        'watch'
    ]);
};
