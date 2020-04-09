import React, { useState, useEffect, useCallback } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios'
import useDebounce from './hooks/debounce';

function getCountries(name) {
  return axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
};

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [isMaxCountries, setMaxCountries] = useState(false);
  const [error, setError] = useState(null);

  const debouncedFilter = useDebounce(filter, 750);


  const handleFilterChange = e => setFilter(e.target.value);

  useEffect(() => {
    if (isMaxCountries) {
      setCountries([]);
    }
  }, [isMaxCountries])

  useEffect(() => {
    if (debouncedFilter) {
      setMaxCountries(false);
      setError(null);
      getCountries(debouncedFilter).then(response => {
          console.log('review the response data', response.data);
          if (response.data.length > 10) {
            setMaxCountries(true);
          }
          setCountries(response.data);
        })
        .catch(() => {
          setError('No countries matched the provided input');
          setCountries([]);
        })
    }
  }, [debouncedFilter])

  return (
    <div className="App">
      <Filter filter={filter} handleChange={handleFilterChange} />
      {error ? <div>{error}</div> : ''}
      {isMaxCountries ? (<div>Too many matches, specify another filter</div>) : 
        <Countries countries={countries} />
      }
    </div>
  );
}

export default App;
