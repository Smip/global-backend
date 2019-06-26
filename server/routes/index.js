const userController = require('../controllers').user;
const articleController = require('../controllers').article;
const article_contentController = require('../controllers').article_content;
const fileController = require('../controllers').file;
const tarifsController = require('../controllers').tarifs;

const passport = require('passport');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');

const express = require('express');


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));

    app.use('/api/user-files', express.static('user-files'));

    app.post('/api/auth', userController.auth);
    app.post('/api/user', passport.authenticate('jwt', {session: false}), userController.create);
    app.get('/api/user', passport.authenticate('jwt', {session: false}), userController.list);
    app.get('/api/user/me', passport.authenticate('jwt', {session: false}), userController.me);

    app.get('/api/articles/:category?/:page?', articleController.list);
    app.post('/api/articles/:category?', passport.authenticate('jwt', {session: false}), articleController.create);

    app.get('/api/article/:slug/:lang?', articleController.retrieve);
    app.post('/api/article/:slug', passport.authenticate('jwt', {session: false}), article_contentController.create);
    app.delete('/api/article/:slug', passport.authenticate('jwt', {session: false}), articleController.destroy);

    app.put('/api/content/:id', passport.authenticate('jwt', {session: false}), article_contentController.update);

    app.post('/api/file/url', passport.authenticate('jwt', {session: false}), fileController.getByLink);
    app.post('/api/file', passport.authenticate('jwt', {session: false}), fileController.upload);

    app.post('/api/tarifs', passport.authenticate('jwt', {session: false}), tarifsController.upload);
    app.get('/api/tarifs/:search?', tarifsController.list);


};
