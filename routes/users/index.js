user = require('../../models/user');


exports.index = function(req, res){
  user.find({}, function(err, users){
    if(err) throw err;
    res.render('users/index', {title: "user Book", users:users});
  });
};

exports.show = function(req, res){
  user.findOne({_id:req.param('id')}, function(err,user){
    if(err) throw err;
    res.render('users/show', { title: 'user(show)', user:user });
  });
};

exports.edit = function(req, res){
  user.findOne({_id:req.param('id')}, function(err, user){
    if(err) throw err;
    res.render('users/edit',{title:'user(Edit)',user:user});
  });
};

exports.new = function(req, res){
  res.render('users/new',{title:'user(new)'});
};

exports.update = function(req,res){
  user.findById(req.param('id'), function(err,user){
    if(!user)
      throw err;
    else{
      user.name = req.param('name');
      user.body = req.param('body');
      user.save(function(err){
        if(err)
          throw err;
        else
          res.redirect('/users/'+user._id);
      });
    }
  });
};

exports.create = function(req,res){
  var me = new user();
  me.name = req.param('name');
  me.body = req.param('body');
  me.save(function(err){
    if(err) throw err;
    res.redirect('/users');
  });
};

exports.destroy = function(req,res){
  user.remove({_id:req.param('id')}, function(err){
    if(err) throw err;
    res.redirect('/users');
  });
};

