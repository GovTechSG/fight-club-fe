var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let appParams = {
      GAME_SERVER_PROTOCOL: process.env.GAME_SERVER_PROTOCOL,
      GAME_SERVER_HOST: process.env.GAME_SERVER_HOST,
      GAME_SERVER_PORT: process.env.GAME_SERVER_PORT,
      GAME_SERVER_CONNECTION_METHOD: process.env.GAME_SERVER_CONNECTION_METHOD
  };
  res.render('index', {appParams: appParams});
});

router.get('/admin', function (req, res, next) {
    let appParams = {
        GAME_SERVER_PROTOCOL: process.env.GAME_SERVER_PROTOCOL,
        GAME_SERVER_HOST: process.env.GAME_SERVER_HOST,
        GAME_SERVER_PORT: process.env.GAME_SERVER_PORT,
        GAME_SERVER_CONNECTION_METHOD: process.env.GAME_SERVER_CONNECTION_METHOD
    };
    res.render('admin', {appParams: appParams});
});

module.exports = router;
