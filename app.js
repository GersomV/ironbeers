
let express = require('express');
let hbs     = require('hbs');
let app     = express();
let path    = require('path');
let PunkAPIWrapper = require('punkapi-javascript-wrapper');
let punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res) => {
  res.render('index');
});

  app.get('/beers',(req,res) => {
    let beers = punkAPI.getBeers()

      beers.then (beers => {
        let data = { beers: beers }
        res.render('beers', data);

        })
        .catch(error => {
          console.log(error);
        })
  });

  app.get('/randomBeer',(req, res)=>{

    punkAPI.getRandom()
    .then (random => {
      res.render('randomBeer', {randomBeer:random[0]});
    })
    .catch(error => {
       console.log(error)
    })
})
//testje onder 5% alcohol
  app.get('/lightBeers', (req, res) => {
    let lightBeers = punkAPI.getBeers({'abv_lt': 5})
    lightBeers.then (lightBeers => {
      let lightData = { lightBeers : lightBeers}
      res.render('lightBeers', lightData);
    })
    .catch(error => { console.log(error)})
  })

app.listen(3000, ()=>{console.log("stuff works")});
