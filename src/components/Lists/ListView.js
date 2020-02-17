import React, { useEffect, useState } from 'react'
import useLoggerService from '../../Services/Diagnostics/LoggerService'
import { useLocationsListsState, LocationsListsStateActions } from '../../State/LocationsListsState'
import DropDown from './ListViewDropDown'
import {ListViewMenuItem} from './ListViewMenu'

const ListView = () => {
    const [listState, dispatchList] = useLocationsListsState();
    const [lists, setLists] = useState([]);
    const logger = useLoggerService();

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

    var storeLocation = (data) => {
        setLists(data);
        dispatchList({type: LocationsListsStateActions.loadLists, data: data});
    }

    var selectList = (listId) => {
        logger.debug(`Selected list -> Id: ${listId}`)
        dispatchList({type: LocationsListsStateActions.selectList, data: listId});
    }

    return (
    <div className="list-view-container">
            <div className="list-view-details-item">
                <div className="list-view-dropdown">
                    <DropDown 
                        selected={listState.lists.filter(l => l.id == listState.selectedListId)[0]} 
                        options={listState.lists} 
                        onSelect={(id)=>{dispatchList({type: LocationsListsStateActions.selectList, data: id})}}/>
                    <div className="list-view-description">this is a list description</div>
                </div>
              
            </div>

            <div className="list-view-details-item">
            <div className="list-view-menu-section">
                    <ListViewMenuItem icon={['far', 'plus-square']} title="add new location" action={()=>{alert("TODO")}} />
                    <ListViewMenuItem icon={['far', 'edit']} title="edit list" action={()=>{alert("TODO")}} />
                    <ListViewMenuItem icon={['far', 'trash-alt']} title="remove list" action={()=>{alert("TODO")}} />
                </div>
                </div>

                <div className="list-view-details">
            <div className="list-view-details-item">
                <div className="list-view-details-name">created on:</div>
                <div className="list-view-details-data">01/01/2000</div>
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">last updated on:</div>
                <div className="list-view-details-data">01/01/2000</div>
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">number of items:</div>
                <div className="list-view-details-data">11</div>
            </div>
            <div className="list-view-details-item">
                <div className="list-view-details-name">private:</div>
                <div className="list-view-details-data">yes</div>
            </div>
        </div>
    </div>)
}


export default ListView;