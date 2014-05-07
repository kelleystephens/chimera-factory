'use strict';

var Mongo = require('mongodb');

exports.index = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  chimeras.find().toArray((err, records)=>{
    res.render('chimeras/index', {chimeras: records, bg: 'chimera-bg.jpg', title: 'Chimera Factory: Listings'});
  });
};

exports.show = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chimeras.findOne({_id:_id}, (err, record)=>{
    res.render('chimeras/show', {chimera: record, bg: 'show-bg.jpg', title: 'Chimera Factory: Show'});
  });
};

exports.new = (req, res)=>{
  res.render('chimeras/new', {bg: 'chimera-bg.jpg', title: 'Chimera Factory: New'});
};

exports.create = (req, res)=>{
  var head;
  switch(req.body.head){
  case 'Meerkat':
    head = 'head-meerkat.png';
    break;
  case 'Crab':
    head = 'head-crab.png';
    break;
  case 'Bunny':
    head = 'head-bunny.png';
    break;
  case 'Genie':
    head = 'head-genie.png';
  }

  req.body.head = head;

  var body;
  switch(req.body.body){
  case 'Meerkat':
    body = 'body-meerkat.png';
    break;
  case 'Crab':
    body = 'body-crab.png';
    break;
  case 'Bunny':
    body = 'body-bunny.png';
    break;
  case 'Genie':
    body = 'body-genie.png';
  }

  req.body.body = body;

  var feet;
  switch(req.body.feet){
  case 'Meerkat':
    feet = 'feet-meerkat.png';
    break;
  case 'Crab':
    feet = 'feet-crab.png';
    break;
  case 'Bunny':
    feet = 'feet-bunny.png';
    break;
  case 'Genie':
    feet = 'feet-genie.png';
  }

  req.body.feet = feet;
  var chimeras = global.nss.db.collection('chimeras');
  chimeras.save(req.body, (err, obj)=>{
    res.redirect(`/chimeras/${obj._id}`);
  });
};

exports.destroy = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chimeras.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/chimeras');
  });
};

exports.filter = (req, res)=>{
  var o = {};
  o[req.query.section] = req.query.section + '-' + req.query.animal + '.png';

  var chimeras = global.nss.db.collection('chimeras');
  chimeras.find(o).toArray((err, records)=>{
    res.render('chimeras/index', {chimeras: records, bg: 'chimera-bg.jpg', title: 'Chimera Factory: Listings'});
  });
};
