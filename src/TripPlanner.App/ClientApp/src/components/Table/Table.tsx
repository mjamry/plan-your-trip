import React from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import {
  DataGrid, GridActionsCellItem, GridColDef, GridRowModel, GridRowParams,
} from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import CustomToolbar from './CutomToolbar';
import { CustomToolbarItemProps } from './CustomToolbarItem';

const useStyles = makeStyles({
  root: {
    background: 'white',
  },
});

type Props<T> = {
    columns: GridColDef[];
    data: T[];
    isLoading: boolean;
    edit: (data: T) => void;
    remove: (data: T) => void;
    onRowClick: (rowData: GridRowModel<T>) => void;
    customActions?: CustomToolbarItemProps[];
}

const Table = <T, >(props: Props<T>) => {
  const {
    columns, onRowClick, data, isLoading, edit, remove, customActions,
  } = props;
  const classes = useStyles();

  const rowActions = [
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        /* eslint-disable no-console */
        <GridActionsCellItem icon={<Edit />} onClick={() => edit(params.row as T)} label="Edit" />,
        <GridActionsCellItem icon={<DeleteOutline />} onClick={() => remove(params.row as T)} label="Remove" />,
      ],
    }];

  return (
    <>
      <DataGrid
        className={classes.root}
        rows={data}
        columns={[...columns, ...rowActions]}
        onRowClick={(params) => onRowClick(params.row as T)}
        loading={isLoading}
        disableColumnMenu
        hideFooterSelectedRowCount
        components={{
          Toolbar: (() => <CustomToolbar actions={customActions} />),
        }}
      />
    </>
  );
};

export default Table;
