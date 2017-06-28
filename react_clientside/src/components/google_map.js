import React from 'react';
import ReactDOM from 'react-dom';

class GoogleMap extends React.Component {
  static get defaultProps() {
    return {
      zoom: 13,
      mapLat: 43.6429553,
      mapLng: -79.4291237
    };
  }

  componentDidMount() {
    // debugger;
    console.log('GOOGLE MAPS loaded', this.props)
    const mapOptions = {
        center: this.mapCenterLatLng(),
        zoom: +this.props.zoom
      },
      map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);

    const bounds = new google.maps.LatLngBounds();
    Object.keys(this.props.places).forEach(
      placeID => {
        const marker =new google.maps.Marker({
          position: this.mapCenterLatLng(
                      this.props.places[placeID].geometry.location.lat,this.props.places[placeID].geometry.location.lng
                    ),
          title: this.props.places[placeID].name,
          map: map
        });
        bounds.extend(marker.position);
      }
    );

    map.fitBounds(bounds);

    //console.log(markers);
    // const marker = new google.maps.Marker({
    //   position: this.mapCenterLatLng(), title: 'Hi', map: map
    // });

    this.setState({map: map});
  }

  mapCenterLatLng(lat, lng) {
    const props = this.props;
    return new google.maps.LatLng(
      lat || props.mapLat, lng || props.mapLng);
  }

  render() {
    return (
      <div className='google-map-container'></div>
    );
  }
}

export default GoogleMap;
