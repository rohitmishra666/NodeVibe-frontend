import React from 'react'
import { useRef } from 'react'

function Share() {

  const shareRef = useRef()
  
  const share = () => {

    navigator.clipboard.writeText(window.location.href)
    .then(() => {
      // TODO: Show a toast message
      console.log('URL copied to clipboard')
    })
    .catch((error) => {
      console.error('Error copying URL to clipboard: ', error)
    })
  }
  return (
    <div className='pb-1'>
      <button
      onClick={share}
      ref={shareRef}
      className='pb-1'
      >
        <lord-icon
          src="https://cdn.lordicon.com/dxnllioo.json"
          trigger="hover"
          stroke="bold"
        >
        </lord-icon>
      </button>
    </div>
  )
}

export default Share