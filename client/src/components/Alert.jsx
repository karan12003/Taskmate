import React from 'react'

function Alert({alert}) {

  return (
    <div className="w-full text-center text-lg font-medium px-4 py-[2px] absolute z-[100] text-white bg-[#f4b6b6]" style={{backgroundColor:alert.type==="success"?"var(--accent-color)":"#e84141"}} >
        <p>{alert.message}</p>
    </div>
  )
}

export default Alert
