import React, { useEffect, useState } from 'react'
import { useLocationsState, LocationsStateActions } from '../State/LocationsState'
import useLoggerService from '../Services/Diagnostics/LoggerService'
import { useLocationsListsState, LocationsListsStateActions } from '../State/LocationsListsState'


const ListView = () => {
    const [state, dispatchLocations] = useLocationsState();
    const [listState, dispatchList] = useLocationsListsState();
    const [lists, setLists] = useState();
    const logger = useLoggerService();

    useEffect(() => {
        fetch(`http://localhost:5000/lists`)
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
    }

    var selectList = (listId) => {
        logger.debug(`Selected list -> Id: ${listId}`)
        dispatchList({type: LocationsListsStateActions.selectList, data: listId});
    }

    var renderLists = () => {
        if (lists)
            return lists.map((list) => (
                <div className="list-view-item" onClick={()=>selectList(list.id)}>{list.name} </div>
            ))

        return ''
    }

    return (<div className="list-view-container"> {renderLists()}  </div>)
}


export default ListView;