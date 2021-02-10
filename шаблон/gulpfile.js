var gulp            = require('gulp'), // Подключаем Gulp
    less            = require('gulp-less'),//Подключаем Less пакет,
    browserSync     = require('browser-sync'),// Подключаем Browser Sync
    concat          = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify          = require('gulp-uglifyjs'),// Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano         = require('gulp-cssnano'),// Подключаем пакет для минификации CSS
    rename          = require('gulp-rename'),// Подключаем библиотеку для переименования файлов
    del             = require('del'),// Подключаем библиотеку для удаления файлов и папок
    imagemin        = require('gulp-imagemin'),// Подключаем библиотеку для работы с изображениями
    pngquant        = require('imagemin-pngquant'),// Подключаем библиотеку для работы с png
    cache           = require('gulp-cache'),// Подключаем библиотеку кеширования
    autoprefixer    = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    cssfont64       = require('gulp-cssfont64'),
    plumber         = require('gulp-plumber'),
    svgStore        = require('gulp-svgstore'),//для создания спрайтов svg
    //  svgSprite       = require('gulp-svg-sprites');//для создания спрайтов svg
    svgmin          = require('gulp-svgmin');//минификация svg
//    cheerio         = require('gulp-cheerio');// удаление лишних атрибутов из svg
//	replace         = require('gulp-replace');//фиксинг некоторых багов


//less
gulp.task('less', function(){ // Создаем таск Less
    return gulp.src('app/less/**/*.less')// Берем источник
        .pipe(plumber({
        errorHandler: function (error) {
            gutil.log('Error: ' + error.message);
            this.emit('end');
        }})) 
        .pipe(less())// Преобразуем Less в CSS посредством gulp-less
        .pipe(autoprefixer(['last 15 versions', '>1%','ie 8','ie 7'],{cascade:true}))// Создаем префиксы
        .pipe(gulp.dest('app/css'))// Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream:true}));// Обновляем CSS на странице при изменении
});



//scripts
gulp.task('scripts', function(){//Создаем таск scripts для сжатия и сборки js-библиотек
    return gulp.src([// Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js',// Берем jQuery
        //        'app/libs/jquery.easytabs.min.js',
        //          'app/libs/PIE_uncompressed.js',
//        'app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
//        'app/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js',
//        'app/libs/isotope/dist/isotope.pkgd.min.js',
//        'app/libs/imagesloaded/imagesloaded.pkgd.min.js',
//        'app/libs/imagefill/js/jquery-imagefill.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/placeholders.min.js'
//        'app/libs/Snap.svg/dist/snap.svg-min.js'
      

        //        'app/libs/jquery.mousewheel.min.js'
        //        'app/libs/jquery.nicescroll-master/dist/jquery.nicescroll.min.js'

    ])
        .pipe(concat('libs.min.js'))// Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify())// Сжимаем JS файл
        .pipe(gulp.dest('app/js'));// Выгружаем в папку app/js
});


//css-libs
gulp.task('css-libs',['less'], function(){// Создаем таск css-libs для сжатия css-библиотек 
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano())// Сжимаем
        .pipe(rename({suffix:'.min'}))// Добавляем суффикс .min
        .pipe(gulp.dest('app/css'));// Выгружаем в папку app/css

});


//gulp.task('font64', function(){//конвертация шрифта
//    return gulp.src('app/fonts_convert/**/*')
//        .pipe(cssfont64())
//        .pipe(gulp.dest('app/css'))
//        .pipe(browserSync.reload({stream:true}));
//
//});

//gulp.task('spritesSvg', function () {
//    return gulp.src('app/svg/*.svg')
//        .pipe(svgmin({
//        js2svg: {
//            pretty: true
//        }
//    }))
////        .pipe(cheerio({
////        run: function ($) {
////            $('[fill]').removeAttr('fill');
////            $('[style]').removeAttr('style');
////        },
////        parserOptions: { xmlMode: true }
////    }))
//        .pipe(svgStore())
//        .pipe(rename({basename:'sprite'}))
//        .pipe(gulp.dest('app/svg/sprite_svg'));
//});

//img
gulp.task('img', function(){//Таск для сжатия изображения 
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({// Сжимаем их с наилучшими настройками с учетом кеширования
        interlaced: true,
        progressive: true,
        svgoPlugins:[{removeViewBox: false}],
        une:[pngquant()] 

    })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

//browser-sync
gulp.task('browser-sync', function(){// Создаем таск browser-sync для обнавления браузера при любом сохранении в файлах 
    browserSync({// Выполняем browserSync
        server:{// Определяем параметры сервера
            baseDir:'app'// Директория для сервера - app
        },
        notify:false// Отключаем уведомления
    });
});



//watch
gulp.task('watch',['browser-sync', 'css-libs', 'scripts'], function(){//Создаем таск для наблюдение за измененияеми в  файлах
    gulp.watch('app/less/**/*.less', ['less']) // Наблюдение за less файлами в папке less
    gulp.watch('app/fonts/**/*', browserSync.reload)
    gulp.watch('app/*.html', browserSync.reload)// Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload)// Наблюдение за JS файлами в папке js 
//    gulp.watch('app/svg/*.svg', browserSync.reload)// Наблюдение за svg
});

//build
gulp.task('build',['clean','img','less', 'scripts', 'css-libs'], function(){//Таск для выгрузки файлов в продакшен
    var buildCss = gulp.src([ // Переносим css-файлы в продакшен
        'app/css/style.css',
        'app/css/libs.min.css',
        'app/css/media.css',
        'app/css/fonts.css'
//        'app/css/header.css'
    ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')// Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));

    var builJs = gulp.src('app/js/**/*')// Переносим js-файлы в продакшен
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

//    var buildSvg = gulp.src('app/svg/sprite_svg/sprite.svg') // Переносим sprite.svg в продакшен
//    .pipe(gulp.dest('dist/svg/sprite_svg'));

}); 


//clean
gulp.task('clean', function(){//Таск для удаления папки dist
    return del.sync('dist')// Удаляем папку dist перед сборкой
});

//clear
gulp.task('clear', function(){// Таск для очистки кэша(ручным способом)
    return cache.clearAll()
});



gulp.task('default', ['watch']);//Запуск 