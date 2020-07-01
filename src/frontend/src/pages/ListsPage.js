import React, {useState, useEffect} from 'react' 
import { useListsState, ListsStateActions } from './../State/ListsState'
import DateTimeFormatter from './../Common/DateTimeFormatter'
import useListService from './../Services/ListService'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  };

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '90vw',
        height: '90vh',
        alignItems: 'center'
    }
}

const ListsPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listState, dispatchList] = useListsState();
    const listService = useListService();
    const dateTimeFormatter = DateTimeFormatter();

    useEffect(()=>
    {
        const fetchListData = async () => {
            await listService.getAll();
        }

        setIsLoading(true);
        fetchListData();
        setIsLoading(false);
    }, [])

    return (
        <div className="list-page-container">
            {isLoading 
            ? <CircularProgress />
            : <MaterialTable
                title={`You have ${listState.lists.length} lists`}
                columns={[
                    {title: "Name", field: "name"},
                    {title: "Description", field: "description"},
                    {title: "Created", field: "created", type: "datetime", redner: created => dateTimeFormatter.format(created)},
                    {title: "Updated", field: "updated", type: "datetime", redner: updated => dateTimeFormatter.format(updated)},
                    //TODO => {title: "Number of locations", field: "numberOfItems", type: "numeric",},
                    {title: "Private", field: "isPrivate", render: isPrivate => isPrivate ? "Yes" : "No"},
                    //TODO => {title: "Shared", field: "isShared", render: isShared => isShared ? "Yes" : "No"},
                ]}
                onRowClick={((evt, selectedRow) => console.log(selectedRow.id))}
                options={{
                    pageSize: 5,
                    pageSizeOptions: []
                }}
                data={listState.lists} 
                icons={tableIcons} 
            />}
        </div>
      );
}

export default withStyles(styles)(ListsPage);