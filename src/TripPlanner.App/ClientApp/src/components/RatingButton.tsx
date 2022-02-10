import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';

const NUMBER_OF_STARS = 5;

type Props = {
  value: number;
  onSelect?: (value: number) => void;
  readOnly?: boolean;
}

function RatingButton({ value, onSelect = () => {}, readOnly = false }: Props) {
  const [stars, setStars] = useState<JSX.Element[]>();

  const getStars = (selectedStars: number): JSX.Element[] => {
    const output = [...Array(NUMBER_OF_STARS)];

    output.forEach((item, index) => {
      let className = '';

      if (index > selectedStars) {
        className = !readOnly ? 'location-rating-star' : 'location-rating-star-inactive';
      } else {
        className = !readOnly ? 'location-rating-star-selected' : 'location-rating-star-selected-inactive';
      }

      output[index] = (
        <span
          className={className}
          onClick={() => onSelect(index)}
          onKeyDown={() => onSelect(index)}
          key={item}
          role="presentation"
        >
          <StarIcon />
        </span>
      );
    });
    return output.reverse();
  };

  useEffect(() => {
    setStars(getStars(value));
  }, [value]);

  if (!readOnly) {
    return (
      <div
        className="location-rating-container"
        onMouseOver={() => setStars(getStars(0))}
        onMouseOut={() => setStars(getStars(value))}
        onBlur={() => undefined}
        onFocus={() => undefined}
      >
        {stars}
      </div>
    );
  }

  return (
    <div className="location-rating-container">
      {stars}
    </div>
  );
}

export default RatingButton;
