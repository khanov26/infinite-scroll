import { useEffect, useState } from 'react';

export default function useFetchCategories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      let response = await fetch('https://dummyjson.com/products/categories');
      let result = await response.json();
      setCategories(result);
    }

    fetchCategories();
  }, []);

  return categories;
}
