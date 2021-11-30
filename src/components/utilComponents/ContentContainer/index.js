import React from 'react'

function ContentContainer({ children ,className}) {
  return (
    <div className={`flex flex-[2] px-2 dark:bg-gray-800 dark:text-white ${className}`}>
      {children}
    </div>
  )
}

export default ContentContainer
