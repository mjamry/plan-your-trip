import React, { useEffect } from 'react';
import { useLocationsState, LocationsStateActions } from '../State/LocationsState'
import useLoggerService from '../Services/Diagnostics/LoggerService'

const LocationsDataDownloader = () => {
    const [{}, dispatchLocations] = useLocationsState();
    var logger = useLoggerService();

    useEffect(() => {
        fetch("http://localhost:5000/Locations")
            .then(response => {
                if (response.status !== 200) {
                    logger.error(`[LocationsDataDownloader] Cannot fetch locations. Error: ${response.statusText}. Code: ${response.status}`)
                }
                else {
                    response.json()
                        .then(data => {
                            if (data) {
                                logger.info(`Successfully loaded ${data.length} locations`)
                                storeLocation(data);
                            }

                        })
                }
            })
    }, [])

    var storeLocation = (locations) => {
        dispatchLocations({
            type: LocationsStateActions.loadLocations,
            data: locations
        })
    }

    return (<div></div>);
}

export default LocationsDataDownloader;