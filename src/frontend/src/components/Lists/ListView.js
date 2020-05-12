import React, { useEffect, useState } from 'react'
import useLoggerService from '../../Services/Diagnostics/LoggerService'
import { useListsState, ListsStateActions } from '../../State/ListsState'
import DropDown from './ListViewDropDown'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'
import {ListViewMenuItem} from './ListViewMenu'
import DateTimeFormatter from '../../Common/DateTimeFormatter'
import { useLocationsState } from '../../State/LocationsState'

const ListView = () => {
    const [listState, dispatchList] = useListsState();
    const [{locations}, dispatchLocations] = useLocationsState();
    const [lists, setLists] = useState([]);
    const logger = useLoggerService();
    const [{}, dispatchModal] = useModalState();

    const dateTimeFormatter = DateTimeFormatter();

    useEffect(() => {
        fetch(`http://localhost:50000/lists`)
            .then(response => {
                if (response.status !== 200) {
                    logger.error(`[ListView] Cannot fetch lists. Error: ${response.statusText}. Code: ${response.status}`)
                }
                else {
                    response.json()
                        .then(data => {
                            if (data) {
                                logger.info(`[ListView] Successfully loaded ${data.length} lists`)
                                storeLocation(data);
                            }

                        })
                }
            })
    }, [])

    var getSelectedList = () => {
        return listState.lists.filter(l => l.id == listState.selectedListId)[0] || {name: "", created: "", updated: "", locations: []};
    }

    var getNumberOfLocations = () => {
        return locations.length;
    }

    var storeLocation = (data) => {
        setLists(data);
        dispatchList({type: ListsStateActions.loadLists, data: data});
    }

    var selectList = (listId) => {
        dispatchList({type: ListsStateActions.selectList, data: listId});
    }

    return (
    <div className="list-view-container">
            <div className="list-view-details-item">
                <div className="list-view-dropdown">
                    <DropDown 
                        selected={getSelectedList()} 
                        options={listState.lists} 
                        onSelect={(id)=>{dispatchList({type: ListsStateActions.selectList, data: id})}}/>
                    <div className="list-view-description text-length-limit text-no-select" title={getSelectedList().description || ""}>{getSelectedList().description || ""}</div>
                </div>
              
            </div>

            <div className="list-view-details-item">
            <div className="list-view-menu-section">
                    <ListViewMenuItem icon={['far', 'plus-square']} title="add new location" action={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addList, data: {}})} />
                    <ListViewMenuItem icon={['far', 'edit']} title="edit list" action={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.editList, data: getSelectedList()})} />
                    <ListViewMenuItem icon={['far', 'trash-alt']} title="remove list" action={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.removeList, data: getSelectedList()})} />
                </div>
                </div>

                <div className="list-view-details">
            <div className="list-view-details-item">
                <div className="list-view-details-name">created on:</div>
                <div className="list-view-details-data">{dateTimeFormatter.format(getSelectedList().created)}</div>    
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">last updated on:</div>
                <div className="list-view-details-data">{dateTimeFormatter.format(getSelectedList().updated)}</div>
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">number of locations:</div>
                <div className="list-view-details-data">{getNumberOfLocations()}</div>
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">private:</div>
                <div className="list-view-details-data">{getSelectedList().isPrivate ? "yes" : "no"}</div>
            </div>
        </div>
    </div>)
}


export default ListView;