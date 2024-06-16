import React from 'react'
import loading from '../icons/loading.png'

const Loading = () => {
  return (
    <div>
        <div className='flex justify-center items-center'>
            <div className='animate-spin h-8 w-8'>
                <img src={loading} alt="spinner" />
            </div>
        </div>
    </div>
  )
}

export default Loading