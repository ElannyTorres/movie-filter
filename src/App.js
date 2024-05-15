import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Card from './components/card/card';
import InputField from './components/inputField/inputField';
import GenreFilter from './components/genreFilter/genreFilter';
import AlertMessage from './components/alertMessage/alertMessage';

const genreColors = {
  Action: 'bg-red-500 text-white',
  Drama: 'bg-blue-500 text-white',
  Crime: 'bg-rose-950 text-white',
  Adventure: 'bg-amber-600 text-white',
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('/data/data.json');
      setGenres(response.data.genres);
      setData(response.data.movies);
      setDataFiltered(response.data.movies);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filterData = () => {
      let filtered = data;

      if (name) {
        filtered = filtered.filter(movie =>
          movie.title.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (description) {
        filtered = filtered.filter(movie =>
          movie.description.toLowerCase().includes(description.toLowerCase())
        );
      }
      if (selectedGenres.length) {
        filtered = filtered.filter(movie =>
          selectedGenres.some(genre => movie.genre.includes(genre))
        );
      }

      setDataFiltered(filtered);
    };

    filterData();
  }, [name, description, selectedGenres, data]);

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres(prevGenres =>
      checked ? [...prevGenres, value] : prevGenres.filter(genre => genre !== value)
    );
  };

  const refreshData = () => {
    setDataFiltered(data);
    setName('');
    setDescription('');
    setSelectedGenres([]);
  };

  return (
    <div className="container mx-auto bg-cyan-50 min-h-screen p-4">
      <h1 className="text-6xl font-bold text-center my-8">MOVIE FILTER</h1>
      <p className="text-2xl text-gray-700 text-center m-2">Welcome to Movie Filter!</p>

      <div className="border-t my-2"></div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <InputField
          label="Name"
          id="grid-title"
          placeholder="The Shawshank"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Description"
          id="grid-description"
          placeholder="Two imprisoned men bond over a number"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
          genreColors={genreColors}
        />
      </div>

      <div className="flex justify-center m-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg"
          onClick={refreshData}
        >
          REFRESH
        </button>
      </div>

      <div className="border-t my-2"></div>

      {isLoading ? (
        <p className="text-center text-red-500 font-bold text-xl col-span-3">Loading...</p>
      ) : dataFiltered.length ? (
        <div className='grid gap-4 grid-cols-3 my-6'>
          {dataFiltered.map((movie, index) => (
            <Card key={index} data={movie} />
          ))}
        </div>
      ) : (
        <AlertMessage message="No movies matched your search criteria. Please try adjusting your filters." color="red" />
      )}
    </div>
  );
}

export default App;
