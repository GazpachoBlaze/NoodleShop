"use strict";


module.exports = function (grunt) {


    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: "grunt-usemin"
    });

    grunt.initConfig ({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: "./",
                    src: ["*.html"],
                    dest: "dist"
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: "node_modules/font-awesome",
                    src: ["fonts/*.*"],
                    dest: "dist"
                }]
            }
        },
        clean: {
            build: {
                src: ["dist/"]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: "./",
                    src: ["img/*.{png,jpg,gif}"],
                    dest: "dist/"
                }]
            }
        },
        useminPrepare: {
            dooo: {
                dest: "dist",
                src: ["index.html", "aboutus.html", "contactus"]
            },
            options: {
                flow: {
                    steps: {
                        css: ["cssmin"],
                        js: ["uglify"]
                    },
                    post: {
                        css: [{
                            name: "cssmin",
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: {
                seperator: ";"
            },
            dist: {}
        },
        uglify: {
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: "utf8",
                algorithm: "md5",
                length: 20
            },
            release: {
                files: [{
                    src: [
                        "dist/js/*.js",
                        "dist/css/*.css"
                    ]
                }]
            }
        },
        usemin: {
            html: ["dist/index.html", "dist/aboutus.html", "contactus.html"],
            options: {
                assets: ["dist", "dist/css", "dist/js"]
            }
        },
        hmtlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    "dist/index.html": "dist/index.html",
                    "dist/aboutus.html": "dist/aboutus.html",
                    "dist/contactus.html": "dist/contactus.html",
                }
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask("build", [
        "clean",
        "copy",
        "imagemin",
        "concat",
        "cssmin",
        "uglify",
        "filerev",
        "usemin",
        "htmlmin"
    ]);
};





















