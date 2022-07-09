import React from 'react'

const RenderChat = ({sender,message}) => {
  return (
    <>
    {sender === "me" ? <div className='me'>{message}</div>:<div className='you'>{message}</div>}
    </>
  )
}

export default RenderChat