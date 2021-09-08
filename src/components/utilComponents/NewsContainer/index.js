import React from 'react'

function NewsContainer({ children ,className}) {
  return (
    <div className={`h-48 hidden lg:block flex-1 p-2 ${className}`}>
      {children}
    </div>
  )
}

export default NewsContainer
