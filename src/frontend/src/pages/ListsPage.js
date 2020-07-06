import React, {useState, useEffect} from 'react' 
import { useListsState, ListsStateActions } from './../State/ListsState'
import DateTimeFormatter from './../Common/DateTimeFormatter'
import useListService from './../Services/ListService'
import { useModalState, ModalStateAction, ModalTypes } from './../State/ModalStateProvider'
import Table from './../components/Table'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        margin: '10px'
    }
}

const ListsPage = ({history, classes}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [listState, dispatchList] = useListsState();
    const listService = useListService();
    const dateTimeFormatter = DateTimeFormatter();
    const [{}, dispatchModal] = useModalState();

    useEffect(()=>
    {
        const fetchListData = async () => {
            setIsLoading(true);
            await listService.getAll();
            setIsLoading(false);
        }

        fetchListData();
    }, [])

    return (
        <div className="">
            <div className={classes.container}>
                <Table
                title={`You have ${listState.lists.length} lists`}
                columns={[
                    {title: "Name", field: "name",
                        //this is a hack to undo autocalculation of columns width
                        width: null 
                    },
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
                add={() => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.addList, data: {}})}
                edit={(list) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.editList, data: list})}
                delete={(list) => dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.removeList, data: list})}
                isLoading={isLoading}
            />
            </div>
        </div>
      );
}

export default withStyles(styles)(ListsPage);