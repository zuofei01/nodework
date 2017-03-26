/**
 * Created by 67345 on 2017/3/21.
 */

var http = require('http');
var parseUrl = require('url').parse;
var NEWS = {
    1:'这是第一条新闻',
    2:'这是第一条新闻',
    3:'这是第一条新闻'
};
function getNews(id) {
    return NEWS[id] || '文章不存在';    //如果id从0到3，则返回具体新闻的内容，如果id不在此范围内则返回文章不存在
}
var server = http.createServer(function (req,res) {  //将html文件写到返回数据中
    function send(html) {
        res.writeHead(200,{
            'content-type':'text/html;charset=utf-8'  //返回数据头中写入发送成功的代码，规定返回的内容为html，字符集为utf-8
        });
        res.end(html);
    }
    var info = parseUrl(req.url,true); //将url解析为对象，以便分别获取他的路径和请求内容
    req.pathname = info.pathname;
    req.query = info.query;

    if (req.url === '/'){
        //如果进入的是主界面，分别返回子界面的url，如果进入的是子界面，调用getnews方法返回新闻的内容
        send('<ul>'+
                '<li><a href="/news?type=1&id=1">新闻一</a> </li>'+
                '<li><a href="/news?type=1&id=2">新闻二</a> </li>'+
                '<li><a href="/news?type=1&id=3">新闻三</a> </li>'+
                '</ul>');
    }else if (req.pathname === '/news' && req.query.type === '1'){
        send(getNews(req.query.id));
    }else{
        send('<h1>文章不存在!</h1>');
    }
});
server.listen(3001);
