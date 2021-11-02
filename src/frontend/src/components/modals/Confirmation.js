import React from 'react'
import Button from '@material-ui/core/Button'

const Confirmation = ({onSubmit, onCancel}) => {
    return (
        <div className="confirmation-container">
            <Button
                    variant="contained" color="primary"
                    onClick={onSubmit} 
            >Yes</Button>
            <Button
                    variant="contained"
                    onClick={onCancel}
            >No</Button>
        </div>
    )
}

export default Confirmation;