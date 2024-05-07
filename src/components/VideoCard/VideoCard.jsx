import React from 'react'
import { useNavigate } from 'react-router-dom';

function VideoCard({ thumbnail = "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",

  title = "About Macbook Pro",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?",
  duration = "5min",
  date = "15-march-2024", author = "vines", id = "" }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row  bg-green-400"
      onClick={() => navigate(`/watch/${id}`)}
    >
      <div className="h-full w-full md:h-[200px] md:w-[300px] "
        style={
          {
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }
        }
      >
        <div className='flex h-full items-end justify-end'>
          <h2 className='text-white'>{duration}</h2>
        </div>
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {description}
          </p>
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-[10px] font-medium text-gray-900">{duration}</span>
            <span className="text-[10px] font-medium text-gray-900">{date}</span>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900">{author}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VideoCard;