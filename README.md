> 此项目是个人写gulp插件的练手项目，用于给CSS文件的头部添加时间戳注释以及更新css中带时间戳文件的时间戳

## 使用

```Javascript
var timestamp = require('./gulp-timestamp');

gulp.task('addTimestamp', function(){
    gulp.src('./css/*.css')
            .pipe(timestamp())
})
```

## 说明

输出的文件头类似这样：

```CSS
/* 此文件更新于: 2016/07/05-15:09 */
```

*替换更新时间戳对时间戳格式有要求(因为原理是按指定格式的时间戳做正则匹配的)*

推荐格式:
```CSS
fontface.ttf?t=201607051926  /* 年月日加四位数字 */
```
