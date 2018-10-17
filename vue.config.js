var WebpackOnBuildPlugin = require('on-build-webpack')
var gulp = require('gulp')
const inject = require('gulp-inject')

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new WebpackOnBuildPlugin(function () {
        gulp.task('on-webpack-build', function () {
          require('fs').writeFileSync('dist/build.js', '/* inject */\n' +
                  '/* endinject */\n' +
                  '\n' +
                  'export default global.VueTable;')
          const targetFiles = gulp.src('./dist/build.js', { base: './' })
          const source = gulp.src(['./dist/js/*.js', './dist/css/*.css'], { read: false })
          return targetFiles
            .pipe(inject(source, {
              relative: true,
              starttag: '/* inject */',
              endtag: '/* endinject */',
              transform: function (filepath) {
                return 'import \'./' + filepath + '\';'
              }
            }))
            .pipe(gulp.dest('./'))
        })
        gulp.start('on-webpack-build')
      })
    ]
  }
}
