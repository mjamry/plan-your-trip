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
    const [progressDetails, setProgressDetails] = useState("");
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
            setProgressDetails("Loading user data");
            log.debug("Get User");
            const user = await userService.getUser();

            setProgress(2/NUMBER_OF_STEPS);
            setProgressDetails("Loading user lists");
            log.debug("Get Lists");
            let lists = await listService.getAll();

            if(lists.length > 0)
            {
                setProgress(3/NUMBER_OF_STEPS);
                setProgressDetails("Loading user locations");
                log.debug("Get locations");
                await locationService.getAll(lists[0].id);
            }

            setProgress(4/NUMBER_OF_STEPS);
            setProgressDetails("Finalize");
            setIsLoading(false);
        };

        loadData();

    }, [])

    return (
    <>
    { isLoading && <div> 
            <div className="app-loader-background"></div>
            <div className="app-loader-container">
                <div className="app-loader-box">
                    <div className="app-loader-logo">Trip Planner Logo</div>
                    <div className="app-loader-progress">
                        <span>loading progress: {Math.round(progress*100)}%</span>
                        <span><FontAwesomeIcon icon="spinner" spin className="fa-2x" /></span>
                        <span className="app-loader-details">{progressDetails}</span>
                    </div>
                    <div className="app-container-footer"></div>
                </div>
            </div>
        </div>}
    </>);
}

export default AppLoader;