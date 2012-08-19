exports.index = function(req, res){
  if(process.env.NODE_ENV == 'production'){
    res.render('index', {title: "production"});
  }else{
    res.render('index', {title: "development" });
  }
};

exports.users = require('./users');
