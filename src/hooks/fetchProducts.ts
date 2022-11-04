import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/product';

interface Params {
  category: string;
  limit: number;
  skip: number;
}

export default function useFetchProducts({ category, limit, skip }: Params) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const prevCategory = useRef('');

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError('');

      const baseUrl =
        category === 'all'
          ? 'https://dummyjson.com/products'
          : `https://dummyjson.com/products/category/${category}`;

      try {
        let response = await fetch(
          baseUrl +
            '?' +
            new URLSearchParams({
              limit: String(limit),
              skip: String(skip),
            })
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        let result = await response.json();
        if (!ignore) {
          setTotalQuantity(result.total);
          if (category === prevCategory.current) {
            setProducts((prev) => prev.concat(result.products as Product[]));
          } else {
            setProducts(result.products as Product[]);
          }
          prevCategory.current = category;
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === 'string') {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    let ignore = false;
    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [limit, category, skip]);

  return {
    products,
    isLoading,
    error,
    totalQuantity,
  };
}
