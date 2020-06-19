import React, {useState} from 'react';
import ModalHeader from './ModalHeader'
import Button from '@material-ui/core/Button'
import {TextField, FormControlLabel, Checkbox} from '@material-ui/core';

const useListFormBuilder = () => {
     var build = ({title, list, onSubmit, onCancel}) => {
        return {
            header: <ModalHeader title={title} onCancel={onCancel}/>,
            body: 
                    <ListDetailsFormBody list={list} onSubmit={onSubmit}></ListDetailsFormBody>,
        }
    }

    return build;
}

const ListDetailsFormBody = ({list, onSubmit}) => {
    const [state, setState] = useState(list);

    var handleInputChanged = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    var handleCheckboxChanged = (e) => {
        setState({...state, [e.target.name]: e.target.checked})
    }

    return(
        <div className="list-form-container">
            <div className="list-form-item">
                <TextField
                    label="Name" 
                    required
                    variant="outlined"
                    size="medium"
                    margin="dense"
                    name="name"
                    onChange={handleInputChanged}
                    value={state.name || ''}
                    autoFocus
                />
            </div>
            <div className="list-form-item">
                <TextField 
                    variant="outlined"
                    size="medium"
                    margin="dense"
                    label="Description"
                    name="description" 
                    onChange={handleInputChanged}
                    value={state.description || ''}
                    multiline
                    rowsMax={5}
                />
            </div>
            <div className="list-form-item">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.isPrivate}
                            onChange={handleCheckboxChanged}
                            name="isPrivate"
                            color="primary"
                            value="false"
                        />
                    }
                    label="Is Private"
                />
            </div>
            <div className="list-form-item-submit">
                <Button 
                        variant="contained" color="primary" 
                        onClick={() => 
                            onSubmit(state)}
                        disabled={!state.name}
                >Save</Button>
            </div>
        </div>
    )
}

export default useListFormBuilder;