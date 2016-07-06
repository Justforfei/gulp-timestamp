var fs = require('fs')
var through = require('through2')

module.exports = function () {
    return through.obj(function(file, enc, cb) {
        var now = new Date();
        var reg = /\?t=\d*\/\d*\/\d*\-\d*\:\d*/g;

        var randomNum = parseInt(Math.random()*10).toString()+parseInt(Math.random()*10).toString()+parseInt(Math.random()*10).toString()+parseInt(Math.random()*10).toString();
        var timestampWithRandom = '?t=' + now.getFullYear() + addZero(now.getMonth()+1) + addZero(now.getDate()) + randomNum;
        var timestamp = now.getFullYear() + '/' + addZero(now.getMonth()+1) + '/' + addZero(now.getDate()) + '-' + addZero(now.getHours()) + ':' + addZero(now.getMinutes())
        var warnInfo = '/* ' + '此文件更新于: ' + timestamp + ' */' + '\n';

        function addZero(num) {
            return num < 10 ? (0+num.toString()) : num.toString();
        }

        function addStamp(info) {
          var stream = through();
          stream.write(info);
          return stream;
        }

        if (file.isNull()) {}
        if (file.isStream()) {}
        if (file.isBuffer()) {

            file.contents = new Buffer(String(file.contents).replace(reg, timestampWithRandom))

            // warnInfo = new Buffer(warnInfo);
            // file.contents = Buffer.concat([warnInfo, file.contents]);

            var str = warnInfo.concat(String(file.contents))
            file.contents = new Buffer(str)
        }

        cb(null, file);
    })
}
