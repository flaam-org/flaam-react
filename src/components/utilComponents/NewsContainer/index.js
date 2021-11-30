import React from 'react'

function NewsContainer({ children ,className}) {
  return (
    <div className={`h-48 hidden lg:block flex-1 dark:bg-gray-800 dark:text-white ${className}`}>
      {children}
    </div>
  )
}

export default NewsContainer
