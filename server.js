
var riot = require('riot'),
    testTag = require('./test.tag'),
    instagram = require('./instagram.tag');

var restify = require('restify'),
    server = restify.createServer({
      url:'http://127.0.0.1'
    }),
    port = 3000;

var TWITTER_CONSUMER_KEY = 'Chl0PDFXZAuCg75cpMNg4Ouje',
    TWITTER_CONSUMER_SECRET = 'MhKb4KcBgAvGOXYGoVNDs2gJmHdwzsro1pnWjmEupAHqRsAB0Z',
    access_token_key = '874970454-xZ2UdBil42siLCwrJwDRtCWizFyMD293EizqXQQE',
    access_token_secret = 'CxsUX1FxFsC6fYbnBXSmjbIvJLeglR1SvdTW389gP4J0O';

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret:TWITTER_CONSUMER_SECRET,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret 
});

var accessToken = '4163437312.5f0ec4e.f66076806af249ae95f7dfdfc70c4c03';
var InstagramAPI = require('instagram-api');
var instagramAPI = new InstagramAPI(accessToken);


server.get('/', function(req, res, next) {
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline

  client.get('statuses/user_timeline', { screen_name: 'tjlastlife', count: 20 }, function(error, tweets, response) {
    if (!error) {
      // res.status(200).render('index', { title: 'Express', tweets: tweets });
      var tagOutput = riot.render(testTag, tweets);
      res.header('Content-Type', 'text/html');
      res.end(tagOutput);
      console.log(tagOutput);  
     return next();
    }
    else {
      console.log(error);
       return next();
    }
  })
 
});

server.get('/instagram',function(req,res,next){
 
  instagramAPI.userSelfMediaLiked().then(function(result) {
     var tagOutput = riot.render(instagram, result);
     res.header('Content-Type', 'text/html');
    // console.log(result.data); // user info
    // console.log(result.limit); // api limit
    // console.log(result.remaining) // api request remaining
    res.end(tagOutput);
    return next();
}, function(err){
	console.log(err); // error info
});




  // res.end(tagOutput);
  return next();
});

server.get('twitter/return',function(req,res,next){
    
    return next();
  }

)

server.listen(port, function() {
  console.log('Refreshed and restarted')
  console.log('You are connected on ' + port);
});
