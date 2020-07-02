import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector((store) => store.state.message)

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`${
          message === 'none'
            ? 'hidden'
            : 'flex px-6 py-2 rounded-full bg-orange-300 border border-orange-600 items-center shadow-md absolute'
        }`}
      >
        {message}
      </div>
    </div>
  )
}

Message.propTypes = {}

export default Message
