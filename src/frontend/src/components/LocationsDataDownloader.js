import React, { useEffect } from 'react';
import { useLocationsState } from '../State/LocationsState'

import { useListsState } from '../State/ListsState'
import useLocationsService from './../Services/LocationService'

const LocationsDataDownloader = () => {
    const [{}, dispatchLocations] = useLocationsState();
    const [{selectedListId}, dispatchLists] = useListsState();
    const locationService = useLocationsService();

    useEffect(() => {
        locationService.getAll(selectedListId);
    }, [selectedListId])

    return (<div></div>);
}

export default LocationsDataDownloader;