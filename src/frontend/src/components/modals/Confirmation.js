import React from 'react'

const Confirmation = ({onSubmit, onCancel}) => {
    return (
        <div className="confirmation-container">
            <button type="button" 
                    className="btn btn-primary" 
                    onClick={onSubmit} >Yes</button>
            <button type="button" 
                    className="btn" 
                    onClick={onCancel}>No</button>
        </div>
    )
}

export default Confirmation;