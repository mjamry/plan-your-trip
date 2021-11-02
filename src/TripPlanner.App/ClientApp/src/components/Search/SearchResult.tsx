import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
            <FontAwesomeIcon icon={['fab', 'wikipedia-w']} className="fab search-result-icon" />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>,
      );
    });

    return output;
  };

  const renderError = () => <div className="search-result-error">No resutls</div>;

  return (
    <List component="nav">
      {results && results.length === 0 ? renderError() : renderResults()}
    </List>
  );
};

export default SearchResult;
