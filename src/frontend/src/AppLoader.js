import React, { useEffect, useState } from 'react';

import useLocationsService from './Services/LocationService'
import useListService from './Services/ListService'
import useLoggerService from './Services/Diagnostics/LoggerService'
import {useListsState} from './State/ListsState'
import useUserService from './Services/UserService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NUMBER_OF_STEPS = 4;

const AppLoader = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [{selectedListId}, dispatchLists] = useListsState();
    const locationService = useLocationsService();
    const listService = useListService();
    const log = useLoggerService('AppLoader');
    const userService = useUserService();

    useEffect(() => {
        const loadData = async () => {
            await locationService.getAll(selectedListId);
        }

        loadData();
    }, [selectedListId])

    useEffect(()=>{
        const loadData = async () => {
            setIsLoading(true);
            //get USER
            setProgress(1/NUMBER_OF_STEPS);
            log.debug("Get User");
            const user = await userService.getUser();
            log.debug(user);

            setProgress(2/NUMBER_OF_STEPS);
            log.debug("Get Lists");
            let lists = await listService.getAll();

            setProgress(3/NUMBER_OF_STEPS);
            log.debug("Get locations");
            await locationService.getAll(lists[0].id);

            setProgress(4/NUMBER_OF_STEPS);
            setIsLoading(false);
        };

        loadData();

    }, [])

    return (
    <>
    { isLoading &&  <div className="app-loader-container">
            <div className="app-loader-title">
                <div className="app-loader-progress">
                    <div>progress: {Math.round(progress*100)}%</div>
                    <div><FontAwesomeIcon icon="spinner" spin className="fa-2x" /></div>
                </div>
                <div className="app-container-footer"></div>
            </div>
        </div>}
    </>);
}

export default AppLoader;