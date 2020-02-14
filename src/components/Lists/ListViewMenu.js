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
                icon={icon}  
                className="list-view-menu-item-icon"/>
        </div>)
}

const ListViewMenu = () => {
    const [{}, dispatchList] = useLocationsListsState();
    const [{locations}, dispatchLocations] = useLocationsState();
    const [{}, dispatchModal] = useModalState();

    return (<div className="list-view-menu-container">
        <div className="list-view-menu-section">
            sort filter
        </div>
        <div className="list-view-menu-section">
            <ListViewMenuItem icon={['far', 'file-alt']} title="download locations" action={()=>GpxFileDownloader.download(locations)} />
            <ListViewMenuItem icon={['far', 'plus-square']} title="add new location" action={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addNewLocationSelect})} />
            <ListViewMenuItem icon={['far', 'edit']} title="edit list" action={()=>{alert("TODO")}} />
            <ListViewMenuItem icon={['far', 'trash-alt']} title="remove list" action={()=>dispatchLocations({type: LocationsStateActions.removeAllLocations})} />
        </div>
        <div className="list-view-menu-section">
            <ListViewMenuItem icon={['far', 'list-alt']} title="show as list" action={()=>dispatchList({type: LocationsListsStateActions.setView, data: LocationListViewType.list})} />
            <ListViewMenuItem icon={['fas', 'border-all']} title="show as grid" action={()=>dispatchList({type: LocationsListsStateActions.setView, data: LocationListViewType.grid})} />
        </div>
    </div>)
}

export default ListViewMenu;