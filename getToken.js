var later = require('later');
var https = require('https');
var fs = require('fs');

var appid = "wx043eb0ebd109314c";
var appsecret = "df15652661ba94f5e97e9efca4a48f9b";
var access_token;

later.date.localTime();
console.log("Now:" + new Date());

var sched = later.parse.recur().every(1).hour();
next = later.schedule(sched).next(10);
console.log(next);

var timer = later.setInterval(test, sched);
setTimeout(test, 2000);
function abcd() {
    console.log("1234567890");

}

function test() {
    console.log(new Date());
    var options = {
        hostname: 'api.weixin.qq.com',
        path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret
    };
    var req = https.get(options, function (res) {
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        var bodyChunks = '';
        res.on('data', function (chunk) {
            bodyChunks += chunk;
        });
        res.on('end', function () {
            var body = JSON.parse(bodyChunks);
            //console.dir(body);
            if (body.access_token) {
                access_token = body.access_token;
                //saveAccessToken(access_token);
                console.log(access_token);

                fs.writeFile(process.execPath + "access_token.txt",access_token, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!,the path is " +process.execPath + "access_token.txt");
                });



            } else {
                console.dir(body);
            }
        });
    });
    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
    return access_token;

}
module.exports=test();
/**
 * Created by 67345 on 2017/3/14.
 */
