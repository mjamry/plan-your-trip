import React, { useEffect, useState } from 'react'
import useLoggerService from '../../Services/Diagnostics/LoggerService'
import { useListsState, ListsStateActions } from '../../State/LocationsListsState'
import DropDown from './ListViewDropDown'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'
import {ListViewMenuItem} from './ListViewMenu'
import DateTimeFormatter from '../../Common/DateTimeFormatter'

const ListView = () => {
    const [listState, dispatchList] = useListsState();
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

    var storeLocation = (data) => {
        setLists(data);
        dispatchList({type: ListsStateActions.loadLists, data: data});
    }

    var selectList = (listId) => {
        dispatchList({type: ListsStateActions.selectList, data: listId});
    }
    console.log(getSelectedList())
    return (
    <div className="list-view-container">
            <div className="list-view-details-item">
                <div className="list-view-dropdown">
                    <DropDown 
                        selected={getSelectedList()} 
                        options={listState.lists} 
                        onSelect={(id)=>{dispatchList({type: ListsStateActions.selectList, data: id})}}/>
                    <div className="list-view-description">{getSelectedList().description || ""}</div>
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
                <div className="list-view-details-name">number of items:</div>
                <div className="list-view-details-data">0</div>
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">private:</div>
                <div className="list-view-details-data">{getSelectedList().private ? "yes" : "no"}</div>
            </div>
        </div>
    </div>)
}


export default ListView;