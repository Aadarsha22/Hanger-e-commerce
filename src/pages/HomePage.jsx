import React from 'react';
import ProductList from '../components/ProductList';

function HomePage({ searchQuery, sortOption }) {
  
  return (
    <div>
      <ProductList searchQuery={searchQuery} sortOption={sortOption} />
    </div>
  );
}

export default HomePage;
