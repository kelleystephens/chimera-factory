'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {bg: 'home-bg.jpg', title: 'Chimera Factory'});
};

exports.about = (req, res)=>{
  res.render('home/about', {bg: 'about-bg.jpg', title: 'Chimera Factory: About'});
};
