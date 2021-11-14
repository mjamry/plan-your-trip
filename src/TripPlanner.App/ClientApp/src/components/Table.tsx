import React, { forwardRef } from 'react';
import MaterialTable, {
  Column, Options, Action, Icons,
} from 'material-table';
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

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
  const {
    title, columns, data, onRowClick, options, isLoading, edit, add, remove, customActions,
  } = props;
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
            onClick: () => add(),
          },
          ...(customActions || []),
        ]}
      />
    </>
  );
};

export default Table;
