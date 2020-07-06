import React, {useState, useEffect} from 'react';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/core/styles';

const NUMER_OF_STARS = 5;

const styles = {

}

var RatingButton = ({value, onSelect = ()=>{}, readOnly = false}) => {
    const [stars, setStars] = useState();

    useEffect(()=>{
        setStars(getStars(value));
    }, [value])

    var getStars = (value) => {
        var output = [...Array(NUMER_OF_STARS)];

        output.map((item, index) => {
            if(index>value){
                output[index] = <span 
                                    className={!readOnly  ? "location-rating-star" : "location-rating-star-inactive"} 
                                    onClick={()=>onSelect(index)} 
                                    key={index}><StarIcon /></span>
            }
            else output[index] = <span 
                                    className={!readOnly  ? "location-rating-star-selected" : "location-rating-star-selected-inactive"} 
                                    onClick={()=>onSelect(index)} 
                                    key={index}><StarIcon /></span>
        })
        return output.reverse();
    }
    
    if(!readOnly){
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

export default withStyles(styles)(RatingButton);