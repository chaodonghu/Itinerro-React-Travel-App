export function selectPlace(place, city) {
  //needs to return an action an object with type props
  return {
    type: 'PLACE_SELECTED',
    payload: place,
    city: city,
  };
}

//  Delete functions
export function deletePlace(index) {
  return {
    type: 'PLACE_DELETED',
    index
  };
}

export function storeDates(datesLength){
  return {
    type: 'DATES_SELECTED',
    payload: datesLength
  };
}

export function fetchGoogleData(dispatch, query) {
  console.log('action!', query)
  const url =
    query.type === 'placeID' ?
      `/api/data?placeID=${query.placeID}` :
    query.type === 'photoRef' ?
      `/api/data?photoRef=${query.photoRef}` :
    `/api/data?destination=${query.destination}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // TODO specific action per fetch type
      console.log(data)
      query.type === 'placeID' ?
        window.open(data.url, '_blank') :
      dispatch({
        type: 'LOCATIONS_FETCHED',
        payload: {
          showResults: true,
          locationsData: data,
          queryData: query,
        }
      });
    });
}
