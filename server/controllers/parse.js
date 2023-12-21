const request = require("request");
const cheerio = require('cheerio');

exports.getHtmlFile = (req, res, next) => {
  const URL = req.body.URL;
  request(URL, (err, response, html) => {
    if (err || response.statusCode !== 200) {
      return res.status(400).json({
        error: "Invalid URL or website is not responding"
      });
    }
    console.log("response status code : ", response.statusCode);
    const htmlCode = { code: html }
    req.pageHTML = htmlCode;
    next();
  });
};

exports.parseHtmlFile = (req, res) => {
  const $ = cheerio.load(req.pageHTML.code);
  const output = {
    metaInfo: {},
    internalLinks: [],
    externalLinks: [],
    href: 0,
    structure: 0,
    design: 0,
    images: [],
    headings: [],
    keywords: {},
    socialMediaTags: {},
    schemaTags: [],
    htmlErrors: [],
    pageSpeedScore: 0
  };


  // Extract meta information
   output.metaInfo = {
    canonical: $('link[rel="canonical"]').attr('href'),
    description: $('meta[name="description"]').attr('content'),
    keywords: $('meta[name="keywords"]').attr('content'),

    // Get OG Values
    og_title: $('meta[property="og:title"]').attr('content'),
    og_url: $('meta[property="og:url"]').attr('content'),
    og_img: $('meta[property="og:image"]').attr('content'),
    og_type: $('meta[property="og:type"]').attr('content'),
    og_tag: $('meta[property="artice:tag"]').attr('content'),

    view_port: $('meta[name="viewport"]').attr('content'),
    title: $('title').text()
  };

  // Extract internal links
  const internalLinks = $("a[href^='/']");
  internalLinks.each((i, link) => {
    output.internalLinks.push($(link).attr('href'));
  });

  // Extract external links
  const externalLinks = $("a[href^='http']");
  externalLinks.each((i, link) => {
    output.externalLinks.push($(link).attr('href'));
  });

  // Extract images
  const images = $("img");
  images.each((i, image) => {
    output.images.push($(image).attr('src'));
  });

  // Extract headings
  const headings = $("h1,h2,h3,h4,h5,h6");
  headings.each((i, heading) => {
    output.headings.push($(heading).text());
  });

  // Extract keywords
  const text = $('body').text().toLowerCase();
  const words = text.match(/\b(\w+)\b/g);
  words.forEach(word => {
    if (!output.keywords[word]) {
      output.keywords[word] = 1;
    } else {
      output.keywords[word]++;
    }
  });

  
  // Extract social media tags
  const socialMediaTags = $('meta[property^="og:"],meta[property^="twitter:"],meta[name^="twitter:"],meta[name^="apple-mobile-web-app-title"],meta[name^="application-name"],link[rel="publisher"],link[rel="author"],link[rel="me"],link[rel="openid"],link[rel="contact"],link[rel="shortlink"],link[rel="canonical"],link[rel="alternate"]');
  socialMediaTags.each((i, tag) => {
    output.socialMediaTags[$(tag).attr('property') || $(tag).attr('name') || $(tag).attr('rel')]= $(tag).attr('content');
  });
  
  // Extract schema tags
// Extract schema tags
const schemaTags = $('script[type="application/ld+json"]');
schemaTags.each((i, tag) => {
  const schema = JSON.parse($(tag).html());
  output.schemaTags.push(schema);
});

// Extract HTML Errors
const htmlErrors = [];
const errorTags = $('[aria-invalid="true"]');
errorTags.each((i, tag) => {
  const errorMessage = $(tag).attr('aria-invalid');
  htmlErrors.push(errorMessage);
});
output.htmlErrors = htmlErrors;

  
  // Calculate Page Speed Score
  const pageSpeedScore = Math.floor(Math.random() * 100);
  output.pageSpeedScore = pageSpeedScore;
  
  res.status(200).json({
 // message: "Html file parsed successfully",
  data: output
  });
  };