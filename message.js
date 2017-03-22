var PORT = 9529;
var http = require('http');
var https = require('https');
var qs = require('qs');
var fs = require('fs');
var TOKEN = 'sskpuzyf';
var feedback;
var reJSON;
var m_from_user_name;
function checkSignature(params, token) {
    var key = [token, params.timestamp, params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);
    return sha1.digest('hex') == params.signature;
}
var server = http.createServer(function (request, response) {
    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);
    if (!checkSignature(params, TOKEN)) {
        response.end('signature fail');
    }
    if (request.method == 'GET') {
        response.end(params.echostr);
    } else {
        var postdata = "";
        request.addListener("data", function (postchunk) {
            postdata += postchunk;
        });

        // request.addListener("end",function (postchunk) {
        //     console.log(postdata);
        //     response.end('success');
        // });
        request.addListener("end", function () {
            var parseString = require('xml2js').parseString;
            var jsonStr = parseString(postdata, {explicitArray: false}, function (err, result) {
                if (!err) {
                    console.log(result);
                    var reply = handleData(result);
                    response.end('success');
                }
            });
        });

        function handleData(msg) {
            var content = msg.xml.Content;
            m_from_user_name = msg.xml.FromUserName;
            var num = parseInt(content);
            feedback = -num;
            console.log(m_from_user_name);
            console.log(feedback);

            reJSON = {
                "touser": m_from_user_name,
                "msgtype": "text",
                "text": {
                    "content": 'answer is  ' + feedback
                }

            }
            var post_str = new Buffer(JSON.stringify(reJSON));
            var access_token = readAccessToken();
            var post_options = {
                host: 'api.weixin.qq.com',
                port: '443',
                path: '/cgi-bin/message/custom/send?access_token=' + access_token,
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
            post_req.write(post_str);
            post_req.end();
            console.log(post_str);
        }
    }
});
function readAccessToken()
{
    var data = fs.readFileSync('/usr/bin/nodejsaccess_token.txt', 'utf8');
    console.log(data);
    return data;
}
server.listen(PORT);
console.log("server running at port: " + PORT + ".");
