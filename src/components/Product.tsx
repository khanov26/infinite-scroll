import React, { FC } from 'react'
import { Product as ProductType } from '../types/product'
import ProductGallery from './ProductGallery';
import ProductRating from './ProductRating';

interface Props {
  product: ProductType
}

const Product: FC<Props> = ({product}) => {
  const {
    title,
    description,
    images,
    rating,
    stock,
    discountPercentage,
    price,
  } = product;

  return (
    <div className="row g-2">
      <div className="col-md-6">
        <ProductGallery images={images} />
      </div>
      <div className="col-md-6">
        <h2>{title}</h2>
        <p className="text-muted">{description}</p>

        <div className="row align-items-center">
          <div className="col">
            <ProductRating rating={rating} />
          </div>

          <div className="col">Stock: {stock}</div>
        </div>

        <div className="row justify-content-start align-items-center">
          <div className="col-auto">
            <p className="fw-bold fs-4">
              ${Math.round((price * (100 - discountPercentage)) / 100)}
            </p>
          </div>
          <div className="col-auto">
            <p className="text-muted fs-5" style={{ textDecoration: 'line-through' }}>${price}</p>
          </div>
          <div className="col-auto">
            <p className="d-inline-block bg-danger text-light p-2 rounded-pill">
              -{discountPercentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product