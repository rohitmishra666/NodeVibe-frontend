import React, {useState} from 'react'

function Dislike() {
  
  const [dislike, setDislike] = useState(false)

  const dislikeHandler = () => {
    setDislike(!dislike)
  }

  return (
    <div>
      <button 
      onClick={dislikeHandler}
      className='p-1 mt-[1px]'>
        <lord-icon
          src="https://cdn.lordicon.com/xzybfbcm.json"
          stroke="bold"
          colors={!dislike ? "": "primary:#9cf4df,secondary:#d4f49c"}
          trigger="hover"
        >
        </lord-icon>
      </button>
    </div>
  )
}

export default Dislike