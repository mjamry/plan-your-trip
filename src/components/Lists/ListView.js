import React, { useEffect, useState } from 'react'
import useLoggerService from '../../Services/Diagnostics/LoggerService'
import { useLocationsListsState, LocationsListsStateActions } from '../../State/LocationsListsState'

const ListView = () => {
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
                <option className="list-view-item" onClick={()=>selectList(list.id)}>{list.name}</option>
            ))

        return ''
    }

    return (
    <div className="list-view-container">
        <div className="list-view-details">
            <div className="list-view-details-item">
            <div className="list-view-dropdown">
                <select>
                    {renderLists()}
                </select>
            </div>
            <div className="list-view-description">this is a list description</div>
            </div>
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