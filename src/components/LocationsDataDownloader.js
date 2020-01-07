import React, { useEffect } from 'react';
import { useLocationsState, LocationsStateActions } from '../State/LocationsState'

const LocationsDataDownloader = () => {
    const [{ locations }, dispatchLocations] = useLocationsState();

    useEffect(() => {
        fetch("https://localhost:5001/Locations")
            .then(response => {
                if (response.status !== 200) {
                    console.error("Download error!")
                }
                else {
                    response.json()
                        .then(data => {
                            if (data) {
                                data.forEach(location => {
                                    storeLocation(location);
                                });
                            }

                        })
                }
            })
    }, [])

    var storeLocation = (location) => {
        dispatchLocations({
            type: LocationsStateActions.addLocation,
            data: location
        })
    }

    return (<div></div>);
}

export default LocationsDataDownloader;