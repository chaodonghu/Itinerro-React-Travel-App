import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

import users from './routes/users';
import auth from './routes/auth';
import places from './routes/trips';


const app = express();

app.use(bodyParser.json());


app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/data', (req, res) => {
  // KEEP SWITCHING API KEY IF IT DOESN'T WORK
  //console.log('api call', req.query)
  const GOOGLE_KEY = '&key=AIzaSyCSDGmGBz9DSvJStHj_Pdbzk3-VeO9-loI';
  const url =
    req.query.placeID ?
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.query.placeID}${GOOGLE_KEY}` :
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=top%20places%20to%20see%20${req.query.destination}${GOOGLE_KEY}&radius=5000&sensor=false&0&libraries=places`;

  fetch(url)
    .then(response =>
      response.json())
    .then(data => {
      //console.log(data)
      res.json(data.result || data.results);
    });
});


app.use('/api/trips', places);


// console.log('dirname', __dirname);
// console.log('staticRoute', staticRoute)

// const compiler = webpack(webpackConfig);



// app.use(webpackMiddleware(compiler, {
//   hot: true,
//   publicPath: "http://localhost:3200",
//   // noInfo: true
// }));
// app.use(webpackHotMiddleware(compiler));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// if(process.env.NODE_ENV === 'production') {
  const jsRoute = path.join(__dirname, '..', 'dist');
  const staticRoute = path.join(__dirname, '..', 'react_clientside', 'public');

  app.use('/', express.static(jsRoute));
  app.use('/static', express.static(staticRoute));
// }
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
