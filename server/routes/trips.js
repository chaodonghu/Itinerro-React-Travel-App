import express from 'express';
import authenticate from '../middlewares/authenticate';
import Trip from '../models/trip';

const router = express.Router();

router.get('/user_id/:user_id', (req, res) => {
  Trip.query({
      select: [ 'id', 'user_id', 'city', 'places_data' ],
      where: { user_id: req.params.user_id },
    })
    .fetchAll()
    .then(trips => {
      console.log('\n\ntrips.js query user_id', trips);
      res.json({ trips });
    });
});

router.get('/trip_id/:trip_id', (req, res) => {
  Trip.forge({
        trip_id: req.params.trip_id
      })
      .fetchAll()
      .then(places => {
        console.log('\n\ntrips.js query trip_id', places.toJSON());
        res.send(places.toJSON())
      })
      .catch(err => res.status(500).json({error: err}));
});

router.post('/submit', authenticate, (req, res) => {
  const user_id = req.currentUser.id;
  const trip_id = req.body.trip_id;
  const city = req.body.city;
  const places_data = req.body.places;
  console.log('\n\nCURRENT USER SUBMISSION TO DATABASE', user_id, req.body);
  Trip.forge({city, trip_id})
      .fetch().then(result => {
        result ?
        Trip.forge({
              id: result.attributes.id
            })
            .save({
              places_data: JSON.stringify(places_data)
            })
            .then(trip => res.json({ user: req.currentUser }))
            .catch(err => res.status(500).json({error: err})) :
        Trip.forge({
              user_id,
              trip_id,
              city,
              places_data: JSON.stringify(places_data)
            })
            .save()
            .then(trip => res.json({ user: req.currentUser }))
            .catch(err => res.status(500).json({error: err}));
  });

  // Trip.forge({
  //     user_id,
  //     trip_id,
  //     city
  //   })
  //   .save({
  //     places_data: JSON.stringify(places_data)
  //   })
  //   .then(trip => {
  //     console.log('\n\ntrip added', trip);
  //     res.json({ user: req.currentUser });
  //   })
  //   .catch(err => res.status(500).json({error: err}))
});

export default router;
