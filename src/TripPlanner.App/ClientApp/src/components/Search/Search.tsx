import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ModalStateAction, useModalState, ModalTypes } from '../../State/ModalState';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import WikipediaAPIWrapper from '../../Common/WikipediaAPIWrapper';
import SearchResult from './SearchResult';

const SearchTimeout = 700;

type Props = {
  name?: string;
}

const Search = (props: Props) => {
  const { name } = props;
  const [searchValue, setSearchValue] = useState<string>(name || '');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: dispatchModal } = useModalState();
  const logger = useLoggerService('Search');

  const handleSearchInputTimeout = () => {
    setIsLoading(true);
    WikipediaAPIWrapper.search(searchValue).then((results) => {
      setSearchResults(results);
      setIsLoading(false);
    });
  };

  const handleSelection = (selectedResult: string) => {
    setSearchResults([]);
    setSearchValue('');

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
    }
  }, [searchValue]);

  return (
    <div className="Search container">
      <div className="search-input">
        <TextField
          placeholder="enter name"
          variant="outlined"
          size="medium"
          margin="dense"
          label="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {isLoading && <CircularProgress />}
      </div>

      <SearchResult results={searchResults} onSelected={handleSelection} />
    </div>
  );
};

export default Search;
