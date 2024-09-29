var express = require('express');
var router = express.Router();
var messages = require('../messagesDb').messages

router.get('/', (req, res, next) => {
    res.render('index', { messages: messages})
})

router.get('/new', (req, res, next) => {
    res.render('form')
})

router.post('/new', (req, res, next) => {
    const message = {
        text: req.body.message,
        user: req.body.user,
        added: new Date()
    }
    messages.push(message)
    res.redirect('/')
})

router.get('/messages/:id', (req, res, next) => {

    if (!messages[req.params.id]) {
        const err = new Error('Page not found')
        err.code = 404
        next(err);
        return
    }
    res.render('message', {message: messages[req.params.id]})
})

router.get('/favicon.ico', (req, res, next) => {
    res.status(204).end()
})

module.exports = router;