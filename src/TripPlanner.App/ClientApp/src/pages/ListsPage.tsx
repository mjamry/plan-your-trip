import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { RouteComponentProps } from 'react-router-dom';
import { Chip } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { useListsState, ListsStateActions } from '../State/ListsState';
import useListService from '../Services/ListService';
import { useModalState, ModalStateAction, ModalTypes } from '../State/ModalState';
import Table from '../components/Table/Table';
import ListDto, { ListEmpty } from '../Common/Dto/ListDto';
import useDateTimeFormatter from '../Common/DateTimeFormatter';

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
  const dateTimeFormatter = useDateTimeFormatter();

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
          columns={[
            {
              headerName: 'Name',
              field: 'name',
            },
            {
              headerName: 'Description',
              field: 'description',
              flex: 3,
            },
            {
              headerName: 'Updated',
              field: 'updated',
              type: 'datetime',
              valueFormatter: (params: any) => dateTimeFormatter.format(params.value),
            },
            {
              headerName: 'Created',
              field: 'created',
              type: 'datetime',
              valueFormatter: (params: any) => dateTimeFormatter.format(params.value),
            },
            {
              headerName: 'Private',
              field: 'isPrivate',
              type: 'boolean',
              renderCell: (params: any) => (params.row.isPrivate ? <Chip label="Private" /> : <Chip label="Public" />),
            },
          ]}
          data={listState.lists}
          onRowClick={((selectedList: ListDto) => {
            dispatchList({ type: ListsStateActions.selectList, data: selectedList.id });
            history.push(`/locations/${selectedList.id}`);
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
          customActions={[
            {
              icon: <AddBox />,
              title: 'add new item',
              action: () => dispatchModal({
                type: ModalStateAction.show,
                modalType: ModalTypes.addList,
                data: ListEmpty,
              }),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ListsPage;
