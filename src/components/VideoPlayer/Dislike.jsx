import React, {useState} from 'react'
import { toast } from 'react-toastify'

function Dislike() {
  
  const [dislike, setDislike] = useState(false)

  const dislikeHandler = () => {
    setDislike(!dislike)
    toast.success(`${!dislike ? 'Video disliked' : 'Dislike removed'}`)
  }

  return (
    <div>
      <button 
      onClick={dislikeHandler}
      className='p-1 mt-[1px]'>
        <lord-icon
          src="https://cdn.lordicon.com/xzybfbcm.json"
          stroke="bold"
          colors={!dislike ? "primary:#ffffff,secondary:#ffffff": "primary:#9cf4df,secondary:#d4f49c"}
          trigger="hover"
        >
        </lord-icon>
      </button>
    </div>
  )
}

export default Dislike