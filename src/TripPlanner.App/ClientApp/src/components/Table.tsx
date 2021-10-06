import React, { forwardRef } from 'react';
import MaterialTable, {
  Column, Options, Action, Icons,
} from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

/* eslint-disable react/jsx-props-no-spreading */
const tableIcons: Icons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

type Props = {
    title: string;
    columns: Column<any>[];
    data: any[];
    isLoading: boolean;
    edit: (data: any) => void;
    remove: (data: any) => void;
    add: () => void;
    onRowClick: (e?: React.MouseEvent, data?: any) => void;
    options?: Options<any>;
    customActions?: Action<any>[];
}

const Table = (props: Props) => {
  const { title, columns, data, onRowClick, options, isLoading, edit, add, remove, customActions } = props;
  return (
    <>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        options={{
          ...options,
          pageSize: 5,
          pageSizeOptions: [],
          actionsColumnIndex: -1,
        }}
        isLoading={isLoading}
        icons={tableIcons}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Edit',
            onClick: (event, list) => edit(list),
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete',
            onClick: (event, list) => remove(list),
          },
          {
            icon: () => <AddBox />,
            tooltip: 'Add',
            isFreeAction: true,
            onClick: (event) => add(),
          },
          ...customActions || [],
        ]}
      />
    </>
  );
}

export default Table;
