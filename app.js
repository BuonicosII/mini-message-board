const path = require('path');
const express = require('express')
const indexRouter = require('./routes/indexRouter.js');

const app = express()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter)

app.all('*', function(req, res, next) {
  const err = new Error('Page not found')
  err.code = 404
  next(err);
});

app.use((err, req, res, next) => {
    console.error(err,req.url) ;
    res.render('error', {error: err})
  });

app.listen(3000)