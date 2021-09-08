import React from 'react'

function ContentContainer({ children ,className}) {
  return (
    <div className={`flex flex-[2] p-2 ${className}`}>
      {children}
    </div>
  )
}

export default ContentContainer
