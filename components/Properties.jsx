'use client';
import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import Spinner from './Spinner';
import { fetchProperties } from '../utils/request.js';


const Properties = async () => {
  // const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  


  const properties = await fetchProperties()
  //sort property by date
  properties.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {/* <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </section>
  );
};
export default Properties;