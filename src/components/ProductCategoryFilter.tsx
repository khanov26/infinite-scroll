import React, { ChangeEventHandler, FC } from 'react';

interface Props {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const ProductCategoryFilter: FC<Props> = ({
  categories,
  selectedCategory,
  onChange,
}) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <select
      className="form-select"
      aria-label="Catogories select"
      value={selectedCategory}
      onChange={handleChange}
    >
      {categories.map((category) => (
        <option value={category}>{category}</option>
      ))}
    </select>
  );
};

export default ProductCategoryFilter;
