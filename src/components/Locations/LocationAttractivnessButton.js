import React, {useState, useEffect} from 'react';

const NUMER_OF_STARS = 5;

var LocationAttractivnessButton = ({value, onSelect}) => {
    const [stars, setStars] = useState();

    useEffect(()=>{
        setStars(getStars(value));
    }, [value])

    var getStars = (value) => {
        var output = [...Array(NUMER_OF_STARS)];

        output.map((item, index) => {
            if(index>value){
                output[index] = <span className="location-attractivness-star" onClick={()=>onSelect(index)} key={index}>☆</span>
            }
            else output[index] = <span className="location-attractivness-star-selected" onClick={()=>onSelect(index)} key={index}>☆</span>
        })
        return output.reverse();
    }
    
    return (
        <div className="location-attractivness-container" onMouseOver={()=>setStars(getStars(0))} onMouseOut={()=>setStars(getStars(value))}>
            {stars}
        </div>
    )
}

export default LocationAttractivnessButton;