import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'

class UserMap extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {

        zoom: 8
    }

    render() {
        return (
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
                    defaultCenter={{
                        lat: this.props.user.location.coordinates[0],
                        lng: this.props.user.location.coordinates[1]
                    }}
                    defaultZoom={this.props.zoom}
                >
                    <Marker lat={this.props.user.location.coordinates[0]} lng={this.props.user.location.coordinates[1]} name={this.props.user.name} id={this.props.user._id} age={this.props.user.age} />

                </GoogleMapReact>
            </div>
        );
    }
}

export default UserMap;