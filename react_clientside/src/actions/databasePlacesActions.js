import axios from 'axios';

export const submitPlacesSelection = query => {
  console.log('sending places', query)
  axios.post('/api/trips/submit', query.data);
}

export const getPlacesSelection = (dispatch, query) =>
  axios.get(`/api/trips/${query.type}/${query.trip_id}`)
    .then(results => results.data)
    .then(trips => {
      console.log('this is the real blah', trips)
      trips && dispatch({
        type: 'TRIP_LOADED',
        data: trips
      })
    }
    );
