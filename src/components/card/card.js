import React from 'react';

const genreColors = {
  Action: 'bg-red-500 text-white',
  Drama: 'bg-blue-500 text-white',
  Crime: 'bg-rose-950 text-white',
  Adventure: 'bg-amber-600 text-white',
};

function Card(props) {
  const { data } = props;

  return (
    <div className="max-w-sm w-full h-120 rounded overflow-hidden shadow-lg flex flex-col justify-between">
      {data ? (
        <>
          <img className="w-full h-48 object-cover" src={data.img} alt={data.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              { data.title }</div>
            <p className="text-gray-700 text-base">
              { data.description }
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${genreColors[data.genre] || 'bg-gray-200 text-gray-700'}`}>#{ data.genre }</span>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Card;
