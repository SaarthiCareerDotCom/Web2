const gulp = require('gulp');
const ts = require('gulp-typescript');
//const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProjectServer = ts.createProject('tsconfig.json');
const tsProjectClient = ts.createProject('client/tsconfig.json');
const tsProjectCommon = ts.createProject('common/tsconfig.json');

gulp.task('scripts_common', () => {
  const tsResult = tsProjectCommon.src()
  .pipe(tsProjectCommon());
  return tsResult.js.pipe(gulp.dest('.'));
});
gulp.task('scripts_server', () => {
  const tsResult = tsProjectServer.src()
  .pipe(tsProjectServer());
  return tsResult.js.pipe(gulp.dest('.'));
});
gulp.task('scripts_client', () => {
  const tsResult = tsProjectClient.src()
  .pipe(tsProjectClient());
  return tsResult.js.pipe(gulp.dest('.'));
});
gulp.task('watch', ['scripts_server', 'scripts_common'], () => {
  gulp.watch('server/**/*.ts', ['scripts_server']);
  //gulp.watch('client/**/*.ts', ['scripts_client']);
  gulp.watch('common/**/*.ts', ['scripts_common']);
});
/*
gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});
*/
gulp.task('build', ['scripts_server', 'scripts_client', 'scripts_common']);