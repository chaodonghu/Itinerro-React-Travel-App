import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

// import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackConfig from '../webpack.config';

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

var staticRoute = __dirname + '/../react_clientside/public';

app.use('/static', express.static(staticRoute));
// console.log('dirname', __dirname);
// console.log('staticRoute', staticRoute)

// const compiler = webpack(webpackConfig);



// app.use(webpackMiddleware(compiler, {
//   hot: true,
//   publicPath: "http://localhost:3200",
//   // noInfo: true
// }));
// app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => console.log('Running on localhost:3000'))
