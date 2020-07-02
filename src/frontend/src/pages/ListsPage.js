import React, {useState, useEffect} from 'react' 
import { useListsState, ListsStateActions } from './../State/ListsState'
import DateTimeFormatter from './../Common/DateTimeFormatter'
import useListService from './../Services/ListService'
import { useModalState, ModalStateAction, ModalTypes } from './../State/ModalStateProvider'
import Table from './../components/Table'

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '90vw',
        height: '90vh',
        alignItems: 'center'
    }
}

const ListsPage = ({history}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listState, dispatchList] = useListsState();
    const listService = useListService();
    const dateTimeFormatter = DateTimeFormatter();
    const [{}, dispatchModal] = useModalState();

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
        <div className="">
            {isLoading 
            ? <CircularProgress />
            : <Table
                title={`You have ${listState.lists.length} lists`}
                columns={[
                    {title: "Name", field: "name"},
                    {title: "Description", field: "description"},
                    {title: "Updated", field: "updated", type: "datetime", render: list => dateTimeFormatter.format(list.updated)},
                    {title: "Created", field: "created", type: "datetime", render: list => dateTimeFormatter.format(list.created)},
                    //TODO => {title: "Number of locations", field: "numberOfItems", type: "numeric",},
                    {title: "Private", field: "isPrivate", render: list => list.isPrivate ? "Yes" : "No"},
                    //TODO => {title: "Shared", field: "isShared", render: isShared => isShared ? "Yes" : "No"},
                ]}
                onRowClick={((evt, selectedList) => 
                    {
                        dispatchList({type: ListsStateActions.selectList, data: selectedList.id})
                        history.push(`/list/${selectedList.id}`)
                    })}
                data={listState.lists}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, list) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.editList, data: list})
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, list) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.removeList, data: list})
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add',
                        isFreeAction: true,
                        onClick: (event) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addList, data: {}})
                    }
                  ]}
            />}
        </div>
      );
}

export default withStyles(styles)(ListsPage);