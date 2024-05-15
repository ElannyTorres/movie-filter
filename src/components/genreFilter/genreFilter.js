import React from 'react';

const GenreFilter = ({ genres, selectedGenres, handleGenreChange, genreColors }) => (
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
            <label className={`w-full py-3 ms-2 text-sm font-medium ${selectedGenres.includes(genre) ? genreColors[genre] : ''}`}>
              {genre}
            </label>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default GenreFilter;
