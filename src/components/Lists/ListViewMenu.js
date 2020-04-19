import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GpxFileDownloader from '../../Common/GpxFileDownloader'
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'
import { useListsState, ListsStateActions, ListViewType } from '../../State/ListsState'

export const ListViewMenuItem = ({icon, action, title}) => {
    return (
        <div className="list-view-menu-item" title={title} onClick={()=>{action()}}>
            <FontAwesomeIcon 
                icon={icon}  
                className="list-view-menu-item-icon"/>
        </div>)
}

const ListViewMenu = () => {
    const [{}, dispatchList] = useListsState();
    const [{locations}, dispatchLocations] = useLocationsState();
    const [{}, dispatchModal] = useModalState();

    return (<div className="list-view-menu-container">
        <div className="list-view-menu-section">
            sort filter
        </div>
        <div className="list-view-menu-section">
            <ListViewMenuItem icon={['far', 'file-alt']} title="download locations" action={()=>GpxFileDownloader.download(locations)} />
            <ListViewMenuItem icon={['far', 'plus-square']} title="add new location" action={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addNewLocationSelect})} />
        </div>
        <div className="list-view-menu-section">
            <ListViewMenuItem icon={['far', 'list-alt']} title="show as list" action={()=>dispatchList({type: ListsStateActions.setView, data: ListViewType.list})} />
            <ListViewMenuItem icon={['fas', 'border-all']} title="show as grid" action={()=>dispatchList({type: ListsStateActions.setView, data: ListViewType.grid})} />
        </div>
    </div>)
}

export default ListViewMenu;