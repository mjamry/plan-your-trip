import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Table from '../components/Table/Table';

const useStyles = makeStyles({
  container: {
    height: '90vh',
    margin: '10px',
    overflow: 'auto',
  },
});

// TODO hardcoded values
const plans = [
  {
    id: 1,
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 8,
    length: 111,
    stops: 6,
    // private
    // Shared
    // rating
    // finished
  },
  {
    id: 2,
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 6,
    length: 200,
    stops: 22,
  },
  {
    id: 3,
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 10,
    length: 120,
    stops: 12,
  },
];

const PlansPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [isLoading] = useState(false);

  return (
    <div className={classes.container}>
      WORK IN PROGRESS...
      <Table
        columns={[
          {
            headerName: 'Name',
            field: 'name',
            width: 200,
          },
          { headerName: 'Description', field: 'description' },
          { headerName: 'Start', field: 'start' },
          { headerName: 'End', field: 'end' },
          { headerName: 'Duration (days)', field: 'duration', type: 'numeric' },
          { headerName: 'Length (km)', field: 'length', type: 'numeric' },
          { headerName: 'Stops', field: 'stops', type: 'numeric' },
        ]}
        onRowClick={(() => {
          history.push('/plans/1');
        })}
        data={plans}
        edit={() => {}}
        remove={() => {}}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PlansPage;
