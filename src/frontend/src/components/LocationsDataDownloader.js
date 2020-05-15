import React, { useEffect } from 'react';
import { useLocationsState, LocationsStateActions } from '../State/LocationsState'

import { useListsState, ListsStateActions } from '../State/ListsState'
import useLoggerService from '../Services/Diagnostics/LoggerService'

import useRestClient from './../Common/RestClient'

const LocationsDataDownloader = () => {
    const [{}, dispatchLocations] = useLocationsState();
    const [{selectedListId}, dispatchLists] = useListsState();

    var logger = useLoggerService();
    var api = useRestClient();

    useEffect(() => {
        api.get(`http://localhost:50001/Locations/list/${selectedListId}`)
            .then(data => {
                logger.info(`[LocationsDataDownloader] Successfully loaded ${data.length} locations`)
                storeLocation(data);
            })
            .catch(()=>{
                logger.error(`[LocationsDataDownloader] Cannot get locations data.`)
            });
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