const {src, dest, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const minifyHTML = require('gulp-minify-html');
const webserver = require('gulp-webserver');

const cssConfig = require('./build/css.config');
const jsConfig = require('./build/js.config');
const htmlConfig = require('./build/html.config');


// 处理所有的css文件
const handleCSS = (cb)=>{
  // 处理所有的css
  Object.entries(cssConfig).forEach((item)=>{
    let key =item[0];
    let value =item[1];
    src(value)
    .pipe(concat(`${key}.css`))
    .pipe(dest('./dist/css'));
  })
  // 结束任务
  cb();
}


// 处理js库
const handleLibJS = () => {
  return src('./src/lib/**/*.js')
  .pipe(dest('./dist/lib'));
}

// 处理js
const handleJS = (cb) => {
  // 处理所有的css
  Object.entries(jsConfig).forEach((item)=>{
    let key =item[0];
    let value =item[1];
    src(value)
    .pipe(concat(`${key}.js`))
    .pipe(dest('./dist/js'));
  })
  // 结束任务
  cb();
}

// 处理图片
const handleIMG = () => {
  return src('./src/assets/**/*')
  .pipe(dest('./dist/assets'));
}

// 处理字体
const handleFont = ()=>{
  return src('./src/css/**/*.ttf')
  .pipe(dest('./dist/css'));
}


// 处理html
const handleHTML = () => {
  return src(htmlConfig)
  .pipe(dest('./dist/views'));
}

// 开启服务
const server = ()=>{
  return src('./')
  .pipe(webserver({
      livereload: true,
      directoryListing: true,
      middleware: require('./data/mockDataMiddleware')
  }))
};

const watchTask = ()=>{
  return watch('./src/**/*', {ignoreInitial: false, delay: 500}, parallel(handleCSS, handleLibJS, handleJS, handleIMG, handleFont, handleHTML));
};

if(process.env.NODE_ENV === 'production'){
  exports.default = parallel(handleCSS, handleLibJS, handleJS, handleIMG, handleFont, handleHTML);
}
else{
  exports.default = parallel(
    watchTask,
    server
  );
}



