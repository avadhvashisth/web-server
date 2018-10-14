const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now} ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to apped to server log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    CurrentYear: new Date().getFullYear(),
    welcomeMsg: 'Welcome to the home page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    CurrentYear: new Date().getFullYear(),
  });
});

app.get('/projects', (req, res) => {
  app.render('projects.hbs', {
    pageTitle: 'Portfolio',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'some error occured',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
