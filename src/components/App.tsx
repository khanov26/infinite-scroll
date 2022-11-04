import { useCallback, useState } from 'react';
import Product from './Product';
import InfitineScroll from './InfitineScroll';
import ProductCategoryFilter from './ProductCategoryFilter';
import useFetchCategories from '../hooks/fetchCategories';
import useFetchProducts from '../hooks/fetchProducts';

const limit = 10;

function App() {
  const categories = useFetchCategories();

  const allCategories = ['all', ...categories];

  const [selectedCategory, setSelectedCategory] = useState(allCategories[0]);

  const handleSelectedCategoryChange = (category: string) => {
    setSkip(0);
    setSelectedCategory(category);
  };

  const [skip, setSkip] = useState(0);

  const handleLoadMore = useCallback(() => {
    setSkip((prev) => prev + limit);
  }, []);

  const { products, isLoading, error, totalQuantity } = useFetchProducts({
    category: selectedCategory,
    limit,
    skip,
  });

  const isFirstLoading = products.length === 0 && isLoading;

  return (
    <div className="container">
      <div
        className="bg-white shadow py-2"
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        <div className="row">
          <label className="col-sm-2 col-form-label">Category</label>
          <div className="col-sm-10">
            <ProductCategoryFilter
              categories={allCategories}
              selectedCategory={selectedCategory}
              onChange={handleSelectedCategoryChange}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {isFirstLoading && <h4 className="text-center">Loading...</h4>}
      {products.length > 0 && (
        <div className="row g-4">
          <InfitineScroll
            loadMore={handleLoadMore}
            isLoading={isLoading}
            hasMore={totalQuantity !== products.length}
            loader={<h4 className="text-center">Loading...</h4>}
          >
            {products.map((product) => (
              <div key={product.id} className="col-sm-6">
                <div className="shadow-sm h-100">
                  <Product product={product} />
                </div>
              </div>
            ))}
          </InfitineScroll>
        </div>
      )}
    </div>
  );
}

export default App;
