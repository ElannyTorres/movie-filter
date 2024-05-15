import './App.css';
import Card from './components/card/card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  useEffect(() => {
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
    <div className="container mx-auto">
      <h1 className="text-6xl font-bold text-center my-8">MOVIE FILTER</h1>
      <p className="text-2xl text-gray-700 text-center m-2">Welcome to Movie Filter!</p>

      <div className="border-t my-2"></div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-title"
            type="text"
            placeholder="The Shawshank"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-description"
            type="text"
            placeholder="Two imprisoned men bond over a number"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-genre">
            Genre
          </label>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
            {genres.map((genre, index) => (
              <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className={`flex items-center ps-3 rounded ${selectedGenres.includes(genre) ? genreColors[genre] : 'focus:ring-blue-500'}`}>
                  <input
                    id={`${genre}-checkbox`}
                    checked={selectedGenres.includes(genre)}
                    type="checkbox"
                    value={genre}
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 ${selectedGenres.includes(genre) ? genreColors[genre] : 'focus:ring-blue-500'}`}
                    onChange={handleGenreChange}
                  />
                  <label  className={`w-full py-3 ms-2 text-sm font-medium ${selectedGenres.includes(genre) ? genreColors[genre] : ''}`}>{genre}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
        <div class="flex items-center p-4 mb-4 text-m text-red-800 rounded-lg bg-red-50" role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">No movies matched your search criteria.</span> Please try adjusting your filters.
          </div>
        </div>
      )}
    </div>
  );
}

export default App;