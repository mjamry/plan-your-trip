import React, {useState, useEffect} from 'react';

const NUMER_OF_STARS = 5;

var RatingButton = ({value, onSelect = ()=>{}, isActive = false}) => {
    const [stars, setStars] = useState();

    useEffect(()=>{
        setStars(getStars(value));
    }, [value])

    var getStars = (value) => {
        var output = [...Array(NUMER_OF_STARS)];

        output.map((item, index) => {
            if(index>value){
                output[index] = <span 
                                    className={isActive ? "location-rating-star" : "location-rating-star-inactive"} 
                                    onClick={()=>onSelect(index)} 
                                    key={index}>☆</span>
            }
            else output[index] = <span 
                                    className={isActive ? "location-rating-star-selected" : "location-rating-star-selected-inactive"} 
                                    onClick={()=>onSelect(index)} 
                                    key={index}>☆</span>
        })
        return output.reverse();
    }
    
    if(isActive){
        return (
            <div className="location-rating-container" onMouseOver={()=>setStars(getStars(0))} onMouseOut={()=>setStars(getStars(value))}>
                {stars}
            </div>
        )
    }

    return (
        <div className="location-rating-container">
            {stars}
        </div>
    )
}

export default RatingButton;