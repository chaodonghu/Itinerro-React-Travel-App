export function selectPlace(place) {
  console.trace('a place has been selected:', place);
  //needs to return an action an object with type props
  return {
    type: 'PLACE_SELECTED',
    payload: place
  };
}

export function goFetchLocations(query, dispatch) {
    //AIzaSyDTPU6hai6_STJicsn_FPXGfnCb71kPdYg
  //fetch('./fakeState.json')
  fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+ ' top places to see'+'&radius=5000&sensor=false&key=AIzaSyANfEEYlXnOIAq0qn3l48YABVrxQL6DXj0', {headers:{'Access-Control-Allow-Origin': '*'}})
  .then(response => {
    return response.json();
  }).then(locationsData => {
    console.log(locationsData)
    dispatch({
      type: 'LOCATIONS_FETCHED',
      payload: {
        showResults: true,
        locationsData: locationsData.results //.results
      }
    });
  });
}
