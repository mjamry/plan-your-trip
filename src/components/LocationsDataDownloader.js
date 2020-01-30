import React, { useEffect } from 'react';
import { useLocationsState, LocationsStateActions } from '../State/LocationsState'

import { useLocationsListsState, LocationsListsStateActions } from '../State/LocationsListsState'
import useLoggerService from '../Services/Diagnostics/LoggerService'

const LocationsDataDownloader = () => {
    const [{}, dispatchLocations] = useLocationsState();
    const [{selectedListId}, dispatchLists] = useLocationsListsState();

    var logger = useLoggerService();

    useEffect(() => {
        fetch(`http://localhost:5000/Locations/list/${selectedListId}`)
            .then(response => {
                if (response.status !== 200) {
                    logger.error(`[LocationsDataDownloader] Cannot fetch locations. Error: ${response.statusText}. Code: ${response.status}`)
                }
                else {
                    response.json()
                        .then(data => {
                            if (data) {
                                logger.info(`[LocationsDataDownloader] Successfully loaded ${data.length} locations`)
                                storeLocation(data);
                            }

                        })
                }
            })
    }, [selectedListId])

    var storeLocation = (locations) => {
        dispatchLocations({
            type: LocationsStateActions.loadLocations,
            data: locations
        })
    }

    return (<div></div>);
}

export default LocationsDataDownloader;