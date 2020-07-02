import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Table from './../components/Table'
import { useLocationsState, LocationsStateActions } from './../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from './../State/ModalStateProvider'
import useLocationService from './../Services/LocationService'

const LocationsPage = ({match}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [{locations}, dispatchlocations] = useLocationsState(); 
    const [{}, dispatchModal] = useModalState();
    const locationsService = useLocationService();

    useEffect(()=>
    {
        //validate
        const id = match.params.id;
        const fetchListData = async () => {
            await locationsService.getAll(id);
        }

        setIsLoading(true);
        fetchListData();
        setIsLoading(false);
    }, [])

    //id;
    // name;
    // description;
    // attractivness;
    // coordinates;
    // image;
    // link;
    // listId;

    return (<div className="">
        <Table
            title={`You have ${locations.length} locations`}
            columns={[
                {title: "Name", field: "name"},
                {title: "Description", field: "description", cellStyle: {
                    maxLength: 100
                  },},
                {title: "Attractivness", field: "attractivness", type: "number", render: location => location.attractivness},
                {title: "Coordinates", field: "coordinates", render: location => `${location.coordinates.lat}, ${location.coordinates.lon}`},
            ]}
            onRowClick={((evt, location) => console.log(location.id))}
            data={locations}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit',
                    onClick: (event, location) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.editLocation, data: location})
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete',
                    onClick: (event, location) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.removeLocation, data: location})
                },
                {
                    icon: 'add',
                    tooltip: 'Add',
                    isFreeAction: true,
                    onClick: (event) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addNewLocationSelect})
                }
                ]}
        />
    </div>)
}

export default withRouter(LocationsPage);