import { makeStyles } from '@mui/styles';

const useLocationStepsStyles = makeStyles((theme) => ({
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
  cameraView: {
    maxHeight: '200px',
    maxWidth: '200px',
  },
  cameraCanvas: {
    height: '240px',
    width: '320px',
  },
  webSearchContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  webSearchImage: {
    flexGrow: 1,
    width: '30%',
    height: '100px',
    margin: '5px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '&:hover': {
      border: '5px solid',
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default useLocationStepsStyles;
