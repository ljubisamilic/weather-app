import React from 'react';

const Search = ({ city, setCity, getCity }) => {
  return (
    <div className='search-box'>
      <form onSubmit={getCity}>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Search city...'
        />
      </form>
    </div>
  );
};

export default Search;
