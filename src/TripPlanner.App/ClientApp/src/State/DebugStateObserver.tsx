/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Collapse from '@mui/material/Collapse/Collapse';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useRecoilSnapshot } from 'recoil';
import BugReportIcon from '@mui/icons-material/BugReport';
import IconButton from '@mui/material/IconButton';
import {
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import useLoggerService from '../Services/Diagnostics/LoggerService';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'absolute',
    right: '5px',
    zIndex: 9999,
    fontSize: '10pt',
    fontColor: '#000',
  },
  resizeButton: {
    position: 'absolute',
    top: '10px',
    left: '5px',
  },
  content: {
    maxHeight: '95vh',
    width: '400px',
    position: 'relative',
    paddingTop: '20px',
    textAlign: 'left',
    paddingLeft: '5px',
    overflow: 'auto',
    overflowX: 'hidden',
    opacity: 0.9,
  },
  settings: {
    marginTop: '5px',
    paddingLeft: '5px',
  },
  showButton: {
    position: 'absolute',
    top: '10px',
    right: '5px',
  },
  button: {
    height: '20px',
    cursor: 'pointer',
    margin: '5px',
    padding: '5px',
  },
  contentRow: {
    cursor: 'pointer',
  },
});

type State = {
  key: string,
  value: any,
  isSelected: boolean,
};

function DebugStateObserver() {
  const classes = useStyles();
  const snapshot = useRecoilSnapshot();
  const [atomsView, setAtomsView] = useState<State[]>([]);
  const logger = useLoggerService('AppStateViewer');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showStateChanges, setShowStateChanges] = useState<boolean>(false);

  useEffect(() => {
    const atoms: State[] = [];

    if (showStateChanges) {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        logger.debug(node.key, snapshot.getLoadable(node));
      }
    }

    for (const node of snapshot.getNodes_UNSTABLE()) {
      if (!node.key.includes('selector')) {
        atoms.push({
          key: node.key,
          value: snapshot.getLoadable(node).getValue(),
          isSelected: atomsView[node.key] ? atomsView[node.key].isSelected : false,
        });
      }
    }

    setAtomsView(atoms);
  }, [snapshot]);

  const handleShowAtom = (key: string, index: number) => {
    if (atomsView && atomsView.length > 0 && atomsView[index]) {
      console.group(atomsView[index].key);
      atomsView[index] ? console.table(atomsView[index].value) : console.log('Empty');
      console.groupEnd();
    } else logger.debug(`${key} is empty`);
  };

  const renderCollapsed = () => (
    <IconButton
      color="primary"
      aria-label="debug view"
      component="span"
      onClick={() => setIsCollapsed(false)}
    >
      <BugReportIcon />
    </IconButton>
  );

  const renderContent = () => (
    <ClickAwayListener onClickAway={() => setIsCollapsed(true)}>
      <div className={classes.content}>
        <TableContainer component={Paper} className={classes.content}>
          <Table className={classes.content} size="small">
            <TableHead>
              <TableRow>
                <TableCell>State</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atomsView
              && (
                atomsView.map((atom, index) => (
                  <TableRow
                    onClick={() => handleShowAtom(atom.key, index)}
                    className={classes.contentRow}
                  >
                    <TableCell>
                      {atom.key}
                    </TableCell>
                    <TableCell>
                      {`${atom.value}`}
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper className={classes.settings}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={showStateChanges}
                onChange={() => setShowStateChanges(!showStateChanges)}
              />
              )}
            label={<Typography>Log state changes</Typography>}
          />
        </Paper>
      </div>
    </ClickAwayListener>
  );

  return (
    <div className={classes.root}>
      <Collapse
        collapsedSize="40px"
        orientation="vertical"
        in={!isCollapsed}
        timeout={0}
      >
        <Collapse
          collapsedSize="40px"
          orientation="horizontal"
          in={!isCollapsed}
          timeout={0}
        >
          { isCollapsed ? renderCollapsed() : renderContent() }
        </Collapse>
      </Collapse>
    </div>
  );
}

export default DebugStateObserver;