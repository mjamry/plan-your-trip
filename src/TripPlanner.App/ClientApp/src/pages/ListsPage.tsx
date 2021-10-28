import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { useListsState, ListsStateActions } from '../State/ListsState';
import DateTimeFormatter from '../Common/DateTimeFormatter';
import useListService from '../Services/ListService';
import { useModalState, ModalStateAction, ModalTypes } from '../State/ModalState';
import Table from '../components/Table';
import ListDto from '../Common/Dto/ListDto';

const useStyles = makeStyles({
  container: {
    height: '90vh',
    margin: '10px',
    overflow: 'auto',
  },
});

interface Props extends RouteComponentProps<any>{}

const ListsPage = ({ history }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { state: listState, dispatch: dispatchList } = useListsState();
  const { dispatch: dispatchModal } = useModalState();
  const classes = useStyles();
  const listService = useListService();
  const dateTimeFormatter = DateTimeFormatter();

  useEffect(() => {
    const fetchListData = async () => {
      setIsLoading(true);
      await listService.getAll();
      setIsLoading(false);
    };

    fetchListData();
  }, []);

  return (
    <div className="">
      <div className={classes.container}>
        <Table
          title={`You have ${listState.lists.length} lists`}
          columns={[
            {
              title: 'Name',
              field: 'name',
              // this is a hack to undo auto-calculation of columns width
              // @ts-ignore
              width: null,
            },
            { title: 'Description', field: 'description' },
            {
              title: 'Updated',
              field: 'updated',
              type: 'datetime',
              render: (list: ListDto) => dateTimeFormatter.format(list.updated),
            },
            {
              title: 'Created',
              field: 'created',
              type: 'datetime',
              render: (list: ListDto) => dateTimeFormatter.format(list.created),
            },
            {
              title: 'Private',
              field: 'isPrivate',
              render: (list: ListDto) => (list.isPrivate ? 'Yes' : 'No'),
            },
          ]}
          onRowClick={((e: any, selectedList: ListDto) => {
            dispatchList({ type: ListsStateActions.selectList, data: selectedList.id });
            history.push(`/locations/${selectedList.id}`);
          })}
          data={listState.lists}
          add={() => dispatchModal({
            type: ModalStateAction.show,
            modalType: ModalTypes.addList,
            data: undefined,
          })}
          edit={(list: ListDto) => dispatchModal({
            type: ModalStateAction.show,
            modalType: ModalTypes.editList,
            data: list,
          })}
          remove={(list: ListDto) => dispatchModal({
            type: ModalStateAction.show,
            modalType: ModalTypes.removeList,
            data: list,
          })}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ListsPage;
