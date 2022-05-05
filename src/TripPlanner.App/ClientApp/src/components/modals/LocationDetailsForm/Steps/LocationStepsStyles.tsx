import { makeStyles } from '@mui/styles';

const useLocationStepsStyles = makeStyles({
  getLocationButton: {
    textAlign: 'center',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    margin: '5px 0 10px 0',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: '10px',
    margin: '0 5px 0 5px',
  },
  ratingButton: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: '10px 5px 0 5px',
    alignItems: 'center',
  },
  image: {
    maxWidth: '200px',
    maxHeight: '200px',
  },
  imageInput: {
    display: 'none',
  },
});

export default useLocationStepsStyles;
