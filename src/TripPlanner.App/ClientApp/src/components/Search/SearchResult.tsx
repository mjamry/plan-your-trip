import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactComponent as WikiIcon } from '../../assets/images/wiki_icon.svg';

type Props = {
  results: string[];
  onSelected: (result: string) => void;
}

const SearchResult = (props: Props) => {
  const { results, onSelected } = props;

  const renderResults = (): JSX.Element[] => {
    const output: JSX.Element[] = [];

    results.forEach((item) => {
      output.push(
        <ListItem
          button
          key={item}
          onClick={() => onSelected(item)}
        >
          <ListItemIcon>
            <WikiIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>,
      );
    });

    return output;
  };

  const renderError = () => <div className="search-result-error">No results found.</div>;

  return (
    <List component="nav">
      {results && results.length === 0 ? renderError() : renderResults()}
    </List>
  );
};

export default SearchResult;
