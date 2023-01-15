import React from 'react'

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Maps = () => {
    const mapStyles = {        
        height: "100vh",
        width: "100%"};
      
    const defaultCenter = {
    lat: 41.3851, lng: 2.1734
    }
      
    return (
        <LoadScript
        googleMapsApiKey='AIzaSyBsiw4TLYjx5f8Jtl5VzeQoR7dgUy6SyLM'>
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
        />
        </LoadScript>
    )
}
export default Maps