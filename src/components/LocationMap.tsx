import { LocationMapProps } from '../interfaces/components/LocationMapProps.interface';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

 /*
   I know it's a bit extra I just added a map just to pinpoint general loacation of where the IP address is located visually.
   I'm not sure what's going's going on with my computer but it always thinks I'm still in seattle.
 */

  function LocationMap({latitude, longitude}: LocationMapProps) {
    const [center, setCenter] = useState({
      lat: 0,
      lng: 0
    });

    useEffect(() => {
      setCenter({lat: latitude, lng: longitude})
    }, [latitude, longitude])

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })
  
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map: any) {
      setMap(null)
    }, [])
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
        </GoogleMap>
    ) : null
  }
  
  export default React.memo(LocationMap)