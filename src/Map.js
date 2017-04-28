import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class Map extends Component {

  render(){
    const markers=this.props.markers || []
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 11.3216676, lng: 75.934227 }}
      >
        {markers.map(marker => (
          <Marker
            {...marker}

          />
        ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)
