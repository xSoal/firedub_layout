
const conf = {
	sitedomen: "f.net",
}

var gulp = require('gulp'),
sass 	 = require('gulp-sass'),
minCss 	 = require('gulp-csso'),
imageMin = require('gulp-imagemin');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');

var browserify = require("browserify");
var babelify = require("babelify");
var gutil = require('gulp-util');

var concat = require('gulp-concat');
var htmlImport = require('gulp-html-import');
var del = require('del') 

gulp.task('clear', function(){
	del.sync('build');
});

gulp.task('js', function(){
	// gulp.src('app/js/main.js')
	//     .pipe(babel({
 //            presets: ['env']
 //        }))
	// 	.pipe( gulp.dest('build/js') )
	browserify({ debug: true })
		.transform(babelify)
		.require("./app/js/main.js", { entry: true })
		.bundle()
		.on('error',gutil.log)
		.pipe(source('bundle.js'))
    	.pipe(gulp.dest('./build/js'))
    	.pipe( browserSync.reload({stream: true}) );
});


gulp.task('css', function(){

	gulp.src('app/scss/libs/*.css')
	.pipe( concat('libs.css') )
	.pipe( gulp.dest('build/css') );


	gulp.src(['app/scss/*.css', '!app/scss/_loader.css'])
		.pipe( sourcemaps.init() )
		.pipe( sass() ).on('error', function(err) {
            const type = err.type || '';
            const message = err.message || '';
            const extract = err.extract || [];
            const line = err.line || '';
            const column = err.column || '';
            gutil.log(gutil.colors.red.bold('[Less error]') +' '+ gutil.colors.bgRed(type) +' ('+ line +':'+ column +')');
            gutil.log(gutil.colors.bold('message:') +' '+ message);
            gutil.log(gutil.colors.bold('codeframe:') +'\n'+ extract.join('\n'));
            this.emit('end');
        })
				
		
        // .pipe( minCss() )
		.pipe( concat('bundle.css') )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('build/css') )
		.pipe( browserSync.reload({stream: true}) );

	// gulp.src('app/scss/_loader.css')
	// 	.pipe( gulp.dest('build/css') )
	// 	.pipe( browserSync.reload({stream: true}) );
});



gulp.task('image', function(){
	gulp.src(['app/images/**/*' , '!app/images/video'])
		// .pipe( imageMin() )
		.pipe( gulp.dest('build/images') )
		.pipe( browserSync.reload({stream: true}) );


	gulp.src('app/images/video/*')
		.pipe( gulp.dest('build/images/video') );
});


gulp.task('html', function(){
	gulp.src('app/*.html')
		.pipe( htmlImport('app/html_resources/') )
		.pipe( gulp.dest('build/') )
		.pipe( browserSync.reload({stream: true}) );
});


gulp.task('serv_init',['clear', 'html', 'css', 'image' ,'js'], function(){
    browserSync.init({
		proxy: conf.sitedomen,
		// baseDir: './'
    });




	gulp.watch( 'app/scss/*',   ['css'] );
	gulp.watch( 'app/images/**/*', ['image'] );
	gulp.watch( 'app/js/*',		['js'] );
	gulp.watch( 'app/*.html',	['html'] );
	gulp.watch( 'app/html_resources/*.html', ['html'] );
	gulp.watch('app/*.php').on('change', function(){
		browserSync.reload({stream: true});	
	})

});

gulp.task('default', ['serv_init']);

