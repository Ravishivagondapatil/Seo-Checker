const cheerio = require('cheerio');
const request = require('request');

exports.getDensity = (req, res) => {
    const keyword = req.body.KEYWORD;
    const url = req.body.URL;
    let keywordCount = 0;
    let wordCount = 0;
    let keywordDensity = 0;

    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            keywordCount = (html.match(new RegExp(keyword, 'gi')) || []).length;
            wordCount = html.match(/\b\w+\b/g).length;
            keywordDensity = (keywordCount / wordCount) * 100;
            console.log(`Keyword Count: ${keywordCount}`);
            console.log(`Word Count: ${wordCount}`);
            console.log(`Keyword Density: ${keywordDensity}%`);
    
            const data = {
                count : keywordCount,
                density : keywordDensity
            };
    
            console.log(data);
            res.send(data);
        }
    });
};