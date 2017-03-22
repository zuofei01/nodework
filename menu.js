/**
 * Created by 67345 on 2017/3/14.
 */
var https = require('https');
var access_token="9H1ezssvl1-Pdrg208Etd9bsNdgYvnWLcKOkKgEYM2qaE8fKW8OzhNCTsYAqW94st1DAMhbSPZkNWYtu8FILTRu75GkNcoIQxkLFodTIP2tF0wE6TEJ1F_fyo73pv63yKWVfAFAUGF";
var menu = {
    "button": [
        {
            "type": "click",
            "name": "随机数",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                },
                {
                    "type": "view",
                    "name": "视频",
                    "url": "http://v.qq.com/"
                },
                {
                    "type": "click",
                    "name": "赞一下我们",
                    "key": "V1001_GOOD"
                }
            ]
        }
    ]
};

var post_str = new Buffer(JSON.stringify(menu));
//var post_str = JSON.stringify(menu);
console.log(post_str.toString());
console.log(post_str.length);

var post_options = {
    host: 'api.weixin.qq.com',
    port: '443',
    path: '/cgi-bin/menu/create?access_token=' + access_token,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_str.length
    }
};

var post_req = https.request(post_options, function (response) {
    var responseText = [];
    var size = 0;
    response.setEncoding('utf8');
    response.on('data', function (data) {
        responseText.push(data);
        size += data.length;
    });
    response.on('end', function () {
        console.log(responseText);
    });
});

// post the data
post_req.write(post_str);
post_req.end();
