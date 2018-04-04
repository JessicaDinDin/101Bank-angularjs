var gulp =require('gulp');
var $ = require('gulp-load-plugins')();
let cssmin  = require('gulp-clean-css');
var open = require('open');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
 
var app={
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/',
}
 
/*第3方依賴需拷貝複製於 src 和 dev 目錄下*/
gulp.task('lib',function(){
    gulp.src('bower_components/**/*.js')
    .pipe(gulp.dest(app.devPath + 'vendor'))
    .pipe(gulp.dest(app.prdPath + 'vendor'))
    .pipe($.connect.reload());
    
});
 
gulp.task('html',function(){
    gulp.src(app.srcPath+ '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());
    
});
 
gulp.task('json',function(){
    gulp.src(app.srcPath+ 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});
 

gulp.task('css',function(){
    // gulp.src(app.srcPath + 'style/index.css')
    gulp.src(app.srcPath + 'style/**/*.css')
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe(cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload());

    gulp.src(app.srcPath + 'style/template/*.css')
    .pipe(gulp.dest(app.devPath + 'css/template'))
    .pipe(cssmin())
    .pipe(gulp.dest(app.prdPath + 'css/template'))
    .pipe($.connect.reload());
});
 
gulp.task('js',function(){
    gulp.src(app.srcPath+ 'script/**/*.js')
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});
 
gulp.task('image',function(){
    gulp.src(app.srcPath+ 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload());
    
});

// 清除之前文件
gulp.task('clean',function(){
    gulp.src([app.devPath,app.prdPath])
    .pipe($.clean())
});
 
// ㄧ次打包所有文件
gulp.task('build',['image','js','css','lib','html','json']);
 

 
 
gulp.task('serve',['build'],function(){

	$.connect.server({
		root:[app.devPath],
		livereload:true,
		port:1234
	})
	open('http://localhost:1234')
 
    // browserSync.init({
    //      server:  "./build",   
    // });
 
	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath + '**/*.html', ['html']);
	gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
	gulp.watch(app.srcPath + 'style/**/*.css', ['css']);
	gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
	gulp.watch(app.srcPath + 'image/**/*', ['image']);
});
 
gulp.task('default',['serve'])