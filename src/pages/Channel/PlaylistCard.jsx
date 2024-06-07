import React from 'react';

function PlaylistCard({ title, description, thumbnail = "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", author, id, videosCount }) {
  return (
    
      <div className="bg-white shadow-md rounded-lg overflow-hidden h-45 w-64">
      <div className="relative">
        <img src={thumbnail} alt={`${title} thumbnail`} className="w-full h-32 object-cover" />
        <p className="absolute top-2 left-2 bg-zinc-600 text-white text-xs px-2 py-1 rounded">{videosCount} videos</p>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-2">{description}</p>
        <p className="text-sm text-gray-600">By {author}</p>
      </div>
    </div>
    );
}

export default PlaylistCard;
