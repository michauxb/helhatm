var express = require('express');
var router = express.Router();
let Prisma = require('@prisma/client')
let prisma = new Prisma.PrismaClient()

let resultat = []

// WARNING, if the MySQL is not be reacheable, the request below will crash. 
// Comment the region "Prisma" to avoid this issue.
// The result will be an empty array. So you can then set static data by uncommenting the lines below.

// let resultat = [
//   { _count: { rating: 178 }, rating: 'G' },
//   { _count: { rating: 194 }, rating: 'PG' },
//   { _count: { rating: 223 }, rating: 'PG_13' },
//   { _count: { rating: 195 }, rating: 'R' },
//   { _count: { rating: 210 }, rating: 'NC_17' }
// ]


//#region Prisma
prisma.film.groupBy({
  by: ['rating'],
  _count: {
    rating: true
  }
}).then((film) => {
  resultat = film
})
//#endregion

/**
 *  GET home page. 
 * */
router.get('/', function (req, res, next) {
  // Print the result in the console
  console.log(resultat);

  // render the index page and send the result to the view.
  res.render('index', { title: 'HELHa @ Thomas More MECHELEN', ratings: resultat, total: resultat.length });
});

/**
 * Get to the sample page. Take a look of the responsiveness of the page by changing the width of your browser.
 */
router.get('/sample', function (req, res, next) {
  res.render('sample', { title: 'HELHa @ Thomas More MECHELEN - Sample page' });
});

/**
 * return the values to be shown in the plot using an ajax request.
 */
router.post('/values', function (req, res, next) {
  res.status(200).json(resultat);
});

module.exports = router;
