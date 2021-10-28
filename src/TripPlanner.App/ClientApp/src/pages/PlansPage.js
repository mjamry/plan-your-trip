import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Table from './../components/Table'
import { useLocationsState, LocationsStateActions } from './../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from '../State/ModalState'
import { useListsState, ListsStateActions } from './../State/ListsState'
import useLocationService from './../Services/LocationService'
import LocationsMapView from './../components/MapView/LocationsMapView'
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import useGpxFileDownloader from '../Services/GpxFileGenerator/GpxFileDownloader'

import RatingButton from './../components/RatingButton'

const styles = {
    container: {
        height: '90vh',
        margin: '10px',
        overflow: 'auto',
    }
}

const plans = [
    {
        name: 'title',
        description: 'description',
        start: '20-05-2020',
        end: '25-06-2020',
        duration: 8,
        length: 111,
        stops: 6,
        //private
        //Shared
        //rating
        //finished
    },
    {
        name: 'title',
        description: 'description',
        start: '20-05-2020',
        end: '25-06-2020',
        duration: 6,
        length: 200,
        stops: 22
    },
    {
        name: 'title',
        description: 'description',
        start: '20-05-2020',
        end: '25-06-2020',
        duration: 10,
        length: 120,
        stops: 12
    }
]

const PlansPage = ({history, classes}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={classes.container}>
            <Table
                title={`You have X plans`}
                columns={[
                    {title: "Name", field: "name",
                        //this is a hack to undo autocalculation of columns width
                        width: null 
                    },
                    {title: "Description", field: "description"},
                    {title: "Start", field: "start"},
                    {title: "End", field: "end"},
                    {title: "Duration (days)", field: "duration", type: 'numeric'},
                    {title: "Length (km)", field: "length", type: 'numeric'},
                    {title: "Stops", field: "stops", type: 'numeric'},
                ]}
                onRowClick={((evt, selectedList) => 
                    {
                        history.push(`/plans/1`)
                    })}
                data={plans}
                add={()=>{}}
                edit={()=>{}}
                remove={()=>{}}
                isLoading={isLoading}
            />
        </div>
    )
}

export default withStyles(styles)(PlansPage)