var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

// ����http get����
http.get("http://sports.sina.com.cn/global/", function(res) {
    var html = ''; // ����ץȡ����HTMLԴ��
    var news = [];  // �������HTML�������
    res.setEncoding('utf-8');

    // ץȡҳ������
    res.on('data', function(chunk) {
        html += chunk;

    });

    //��ҳ����ץȡ���
    res.on('end', function() {
        //console.log(html);
        var $ = cheerio.load(html);
        $('.upbt-type2').each(function(index,item) {
            var news_item = {
                title: $('p',this).text(), // ��ȡ���ű���
                link: $('a',this).attr('href'), // ��ȡ��������ҳ����
            };
            // ���������ŷ���һ����������
            news.push(news_item);
        });
        console.log(news);
        
    });
	
	

}).on('error', function(err) {
    console.log(err);
});