import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  button: {
    paddingTop: '7px',
    fontSize: '10pt',
    fontColor: 'violet',
  },
});

export type CustomToolbarItemProps = {
  title: string;
  icon: JSX.Element;
  action: () => void;
}

const CustomToolbarItem = (props: CustomToolbarItemProps) => {
  const { title, icon: item, action } = props;
  const classes = useStyles();

  return (
    <Button
      startIcon={item}
      className={classes.button}
      onClick={() => action()}
    >
      {title}
    </Button>
  );
};

export default CustomToolbarItem;
