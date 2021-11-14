import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { Popover } from '@mui/material';
import { ModalStateAction, useModalState, ModalTypes } from '../../State/ModalState';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import WikipediaAPIWrapper from '../../Common/WikipediaAPIWrapper';
import SearchResult from './SearchResult';
import { LocationFormStateActions, useLocationFormState } from '../modals/LocationDetailsForm/LocationDetailsFormState';

const SearchTimeout = 700;

type Props = {
  name?: string;
}

const Search = (props: Props) => {
  const { name } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: dispatchModal } = useModalState();
  const logger = useLoggerService('Search');
  const [searchResultAnchor, setSearchResultAnchor] = React.useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const { state: locationState, dispatch: dispatchLocationState } = useLocationFormState();

  const updateLocationState = (value: string) => {
    dispatchLocationState({
      type: LocationFormStateActions.updateLocation,
      data: { ...locationState.location, name: value },
    });
  };

  const handleSearchInputTimeout = () => {
    setIsLoading(true);
    WikipediaAPIWrapper.search(searchValue).then((results) => {
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

    WikipediaAPIWrapper
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

  const setupTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(setTimeout(handleSearchInputTimeout, SearchTimeout));
  };

  useEffect(() => {
    if (searchValue !== '') {
      setupTimer();
      setIsLoading(false);
      updateLocationState(searchValue);
    }
  }, [searchValue]);

  return (
    <div className="Search container">
      <div className="search-input" ref={inputRef}>
        <TextField
          placeholder="enter name"
          variant="outlined"
          size="medium"
          margin="dense"
          label="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={name || searchValue}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                { isLoading && <CircularProgress size={20} /> }
              </InputAdornment>
            ),
          }}
        />
      </div>
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
