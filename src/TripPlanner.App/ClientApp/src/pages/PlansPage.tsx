import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Table from '../components/Table';

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
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 6,
    length: 200,
    stops: 22,
  },
  {
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
      <Table
        title="You have X plans"
        columns={[
          {
            title: 'Name',
            field: 'name',
            // this is a hack to undo autocalculation of columns width
            // @ts-ignore
            width: null,
          },
          { title: 'Description', field: 'description' },
          { title: 'Start', field: 'start' },
          { title: 'End', field: 'end' },
          { title: 'Duration (days)', field: 'duration', type: 'numeric' },
          { title: 'Length (km)', field: 'length', type: 'numeric' },
          { title: 'Stops', field: 'stops', type: 'numeric' },
        ]}
        onRowClick={(() => {
          history.push('/plans/1');
        })}
        data={plans}
        add={() => {}}
        edit={() => {}}
        remove={() => {}}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PlansPage;
