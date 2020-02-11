import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GpxFileDownloader from '../../Common/GpxFileDownloader'
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'
import { useLocationsListsState, LocationsListsStateActions, LocationListViewType } from '../../State/LocationsListsState'

const ListViewMenuItem = ({icon, action, title}) => {
    return (
        <div className="list-view-menu-item" title={title} onClick={()=>{action()}}>
            <FontAwesomeIcon 
                icon={icon}  />
        </div>)
}

const ListViewMenu = () => {
    const [{}, dispatchList] = useLocationsListsState();
    const [{locations}, dispatchLocations] = useLocationsState();
    const [{}, dispatchModal] = useModalState();

    return (<div className="list-view-menu-container">
        <div className="list-view-menu-section">
            <ListViewMenuItem icon="file-download" title="download locations" action={()=>GpxFileDownloader.download(locations)} />
            <ListViewMenuItem icon="search-plus" title="add new location" action={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addNewLocationSelect})} />
            <ListViewMenuItem icon="edit" title="edit list" action={()=>{alert("TODO")}} />
            <ListViewMenuItem icon="trash-alt" title="remove list" action={()=>dispatchLocations({type: LocationsStateActions.removeAllLocations})} />
        </div>
        <div className="list-view-menu-section">
            <ListViewMenuItem icon='th-list' title="show as list" action={()=>dispatchList({type: LocationsListsStateActions.setView, data: LocationListViewType.list})} />
            <ListViewMenuItem icon='th-large' title="show as grid" action={()=>dispatchList({type: LocationsListsStateActions.setView, data: LocationListViewType.grid})} />
        </div>
    </div>)
}

export default ListViewMenu;