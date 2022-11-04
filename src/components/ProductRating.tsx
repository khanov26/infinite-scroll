import React, { FC } from 'react'

interface Props {
  rating: number;
}

const ProductRating: FC<Props> = ({rating}) => {
  let bgColorClass;
  if (rating >= 4) {
    bgColorClass = 'bg-success';
  } else if (rating >= 3) {
    bgColorClass = 'bg-warning';
  } else {
    bgColorClass = 'bg-danger';
  }
  
  return (
    <div
      className={`d-inline-block p-2 pe-3 text-light ${bgColorClass}`}
      title={`Rating ${rating} out of 5`}
      style={{
        clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)',
        cursor: 'default',
      }}
    >
      {rating}
    </div>
  );
}

export default ProductRating