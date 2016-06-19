module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('grunt-karma')(grunt);

  if (grunt.option('target') && !grunt.file.isDir(grunt.option('target'))) {
    grunt.fail.warn('The --target option specified is not a valid directory');
  }
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dest: grunt.option('target') || 'dist',
    basePath: 'App_Plugins/<%= pkg.name %>',

    concat: {
      dist: {
        src: [
          'app/scripts/controllers/bs_accordion.controller.js'
        ],
        dest: '<%= dest %>/<%= basePath %>/js/bs_accordion.controller.js',
        nonull: true
      }
    },

    less: {
      dist: {
        options: {
          paths: ['app/styles'],
        },
        files: {
          '<%= dest %>/<%= basePath %>/css/bs_accordion.css': 'app/styles/bs_accordion.less',
        }
      }
    },

    watch: {
      options: {
        atBegin: true
      },

      less: {
        files: ['app/styles/**/*.less'],
        tasks: ['less:dist']
      },

      js: {
        files: ['app/scripts/**/*.js'],
        tasks: ['concat:dist']
      },

      html: {
        files: ['app/views/**/*.html'],
        tasks: ['copy:views']
      },

      config: {
        files: ['config/package.manifest'],
        tasks: ['copy:config']
      }
    },

    copy: {
      config: {
        src: 'config/package.manifest',
        dest: '<%= dest %>/<%= basePath %>/package.manifest',
      },

      views: {
        expand: true,
        cwd: 'app/views/',
        src: '**',
        dest: '<%= dest %>/<%= basePath %>/views/'
      },

      nuget: {
        expand: true,
        cwd: '<%= dest %>',
        src: '**',
        dest: 'tmp/nuget/content/'
      },

      umbraco: {
        expand: true,
        cwd: '<%= dest %>/',
        src: '**',
        dest: 'tmp/umbraco/'
      },

      testAssets: {
        expand: true,
        cwd: '<%= dest %>',
        src: ['js/umbraco.*.js', 'lib/**/*.js'],
        dest: 'test/assets/'
      }
    },

    template: {
      nuspec: {
        options: {
          data: {
            name:        '<%= pkg.name %>',
            version:     '<%= pkg.version %>',
            author:      '<%= pkg.author.name %>',
            description: '<%= pkg.description %>'
          }
        },
        files: {
          'tmp/nuget/<%= pkg.name %>.nuspec': 'config/package.nuspec'
        }
      }
    },

    mkdir: {
      pkg: {
        options: {
          create: ['pkg/nuget', 'pkg/umbraco']
        },
      },
    },

    nugetpack: {
      dist: {
        src: 'tmp/nuget/<%= pkg.name %>.nuspec',
        dest: 'pkg/nuget/'
      }
    },

    umbracoPackage: {
      options: {
        name:        '<%= pkg.name %>',
        version:     '<%= pkg.version %>',
        url:         '<%= pkg.url %>',
        license:     '<%= pkg.license %>',
        licenseUrl:  '<%= pkg.licenseUrl %>',
        author:      '<%= pkg.author %>',
        authorUrl:   '<%= pkg.authorUrl %>',
        manifest:    'config/package.xml',
        readme:      'config/readme.txt',
        sourceDir:   'tmp/umbraco',
        outputDir:   'pkg/umbraco',
      }
    },

    clean: {
      dist: '[object Object]',
      test: 'test/assets'
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    }
  });

  grunt.registerTask('default', ['concat', 'less', 'copy:config', 'copy:views']);
  grunt.registerTask('nuget', ['clean', 'default', 'copy:nuget', 'template:nuspec', 'mkdir:pkg', 'nugetpack']);
  grunt.registerTask('package', ['clean', 'default', 'copy:umbraco', 'mkdir:pkg', 'umbracoPackage']);
  
  grunt.registerTask('test', 'Clean, copy test assets, test', function () {
    var assetsDir = grunt.config.get('dest');
    //copies over umbraco assets from --target, this must point at the /umbraco/ directory
    if (assetsDir !== 'dist') {
      grunt.task.run(['clean:test', 'copy:testAssets', 'karma']);
    } else if (grunt.file.isDir('test/assets/js/')) {
      grunt.log.oklns('Test assets found, running tests');
      grunt.task.run(['karma']);
    } else {
      grunt.log.errorlns('Tests assets not found, skipping tests');
    }
  });
};
