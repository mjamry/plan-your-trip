import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropDown = ({selected, options, onSelect}) => {
    const [optionsVisible, setOptionsVisible] = useState(false)

    var handleOptionSelected = (id) => {
        toggleOptions();
        onSelect(id);
    }

    var toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    }
    
    return (
        <div className="drop-down-container">
            <div className="drop-down-title-container" onClick={()=>toggleOptions()}>
                <div className="drop-down-title-name text-length-limit text-no-select" title={selected ? selected.name : ''}>{selected ? selected.name : ''}</div>
                <div className="drop-down-title-arrow">
                    {optionsVisible 
                        ? <FontAwesomeIcon icon={['far', 'caret-square-up']} /> 
                        : <FontAwesomeIcon icon={['far', 'caret-square-down']}/>}
                </div>
            </div>
            {optionsVisible && <ul className="drop-down-options-list">
                {options.map((option)=>(
                    <li 
                        className="drop-down-option text-length-limit text-no-select" 
                        key={option.id} 
                        title={option.name}
                        onClick={()=>handleOptionSelected(option.id)}>{option.name}</li>
                ))}
            </ul>}
        </div>)
}

export default DropDown