import React, {useState} from 'react';
import ModalHeader from './ModalHeader'

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
                <label htmlFor="list-name" className="col-form-label">Name (required)</label>
                <input 
                    name="name" 
                    className="form-control" 
                    id="list-name" 
                    onChange={handleInputChanged}
                    value={state.name || ''}
                    autoFocus/>
            </div>
            <div className="list-form-item">
                <label htmlFor="list-description">Description</label>
                <textarea 
                    name="description" 
                    className="form-control" 
                    onChange={handleInputChanged}
                    rows="5" id="list-description" 
                    value={state.description || ''}></textarea>
            </div>
            <div className="list-form-item">
                <label htmlFor="list-private">Is Private? </label>
                    <input 
                        type="checkbox" 
                        id="list-private" 
                        value="false"
                        name="private"
                        onClick={handleCheckboxChanged}/> 
            </div>
            <hr/>
            <div className="list-form-item-submit">
                <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={() => 
                            onSubmit(state)}
                        disabled={!state.name}>
                    Save</button>
            </div>
        </div>
    )
}

export default useListFormBuilder;