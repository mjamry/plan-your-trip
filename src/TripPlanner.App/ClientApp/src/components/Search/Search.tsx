import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ModalStateAction, useModalState, ModalTypes } from '../../State/ModalState';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import useWikiSearch from '../../Common/WikiSearchService';
import SearchResult from './SearchResult';
import { LocationFormStateActions, useLocationFormState } from '../modals/LocationDetailsForm/LocationDetailsFormState';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  search: {
    flexGrow: '1',
  },
  searchField: {
    width: '100%',
  },
  button: {
    margin: '0.5rem 0 0.5rem 0',
  },
});

type Props = {
  name?: string;
}

const Search = (props: Props) => {
  const classes = useStyles();
  const { name } = props;
  const { state: locationState, dispatch: dispatchLocationState } = useLocationFormState();
  const [searchValue, setSearchValue] = useState<string>(locationState.location.name || '');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: dispatchModal } = useModalState();
  const logger = useLoggerService('Search');
  const [searchResultAnchor, setSearchResultAnchor] = React.useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const wikiSearch = useWikiSearch();

  const updateLocationState = (value: string) => {
    dispatchLocationState({
      type: LocationFormStateActions.updateLocation,
      data: { ...locationState.location, name: value },
    });
  };

  const search = () => {
    if (!searchValue) {
      return;
    }
    setIsLoading(true);
    wikiSearch.search(searchValue).then((results) => {
      setSearchResults(results);
      setIsLoading(false);
      setSearchResultAnchor(inputRef.current);
    });
  };

  const handleSelection = (selectedResult: string) => {
    setSearchResults([]);
    setSearchValue('');

    updateLocationState(selectedResult);

    dispatchModal({
      type: ModalStateAction.show,
      modalType: ModalTypes.loading,
      data: undefined,
    });

    wikiSearch
      .getDetails(selectedResult)
      .then((location) => {
        dispatchModal({
          type: ModalStateAction.show,
          data: location,
          modalType:
          ModalTypes.addLocation,
        });
        logger.debug(`[Search] Received data for ${selectedResult}`, location);
      })
      .catch((error) => {
        logger.error(`[Search] Error while fetching data: ${selectedResult}`, error);
      });
  };

  useEffect(() => {
    if (searchValue !== '') {
      setIsLoading(false);
      updateLocationState(searchValue);
    }
  }, [searchValue]);

  return (
    <div className={classes.root}>
      <div className={classes.search} ref={inputRef}>
        <TextField
          className={classes.searchField}
          placeholder="enter name"
          variant="outlined"
          size="medium"
          margin="dense"
          label="Name"
          onChange={(e) => setSearchValue(e.target.value)}
          value={name || searchValue}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                { isLoading && <CircularProgress size={20} /> }
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={() => search()}
        className={classes.button}
      >
        Search
      </Button>
      <Popover
        open={!!searchResultAnchor}
        anchorEl={searchResultAnchor}
        onClose={() => setSearchResultAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SearchResult results={searchResults} onSelected={handleSelection} />
      </Popover>
    </div>
  );
};

export default Search;
