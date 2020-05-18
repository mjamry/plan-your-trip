import React, { useEffect, useState } from 'react';

import useLocationsService from './Services/LocationService'
import useListService from './Services/ListService'
import useLoggerService from './Services/Diagnostics/LoggerService'
import {useListsState} from './State/ListsState'
import useUserService from './Services/UserService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NUMBER_OF_STEPS = 3;

const AppLoader = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [{selectedListId}, dispatchLists] = useListsState();
    const locationService = useLocationsService();
    const listService = useListService();
    const log = useLoggerService();
    const user = useUserService();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await locationService.getAll(selectedListId);
            setIsLoading(false);
        }

        loadData();
    }, [selectedListId])

    useEffect(()=>{
        const loadData = async () => {
            //do steps
            const isSignedIn = await user.isSignedIn();
            if(!isSignedIn)
            {
                user.signIn();
            }
            else
            {
                setIsLoading(true);
                setProgress(1/NUMBER_OF_STEPS);
                log.debug(`Data Loading Progress: ${progress}`)
                let lists = await listService.getAll();
                await sleep(1000);
                setProgress(2/NUMBER_OF_STEPS);
                log.debug(`Data Loading Progress: ${progress}`)
                let locations = await locationService.getAll(lists[0].id);
                await sleep(1000);
                setProgress(3/NUMBER_OF_STEPS);
            
                log.debug(`Data Loading Progress: ${progress}`)
                
                setIsLoading(false);
            }
        };

        loadData();

    }, [])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


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