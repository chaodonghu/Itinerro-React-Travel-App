import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

import users from './server/routes/users';
import auth from './server/routes/auth';
import places from './server/routes/trips';

/*
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';
*/
const app = express();
const PORT = process.env.PORT || 3000;

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




/*
 *
 *
 *  Server-side rendering, and error routes.
 *
 *
 */

 // Error handling route.
 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send(err);
 });

// Serve static files under the /dist folder.
app.use(express.static('public'));

// Route to capture client-side routes and use the statically served files.
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// if (process.env.NODE_ENV !== 'production') {
  // const staticRoute = __dirname + '/../public';
  // app.use('/', express.static(staticRoute));
// }

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser`));
