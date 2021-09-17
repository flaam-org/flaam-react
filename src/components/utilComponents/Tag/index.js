import React from 'react'
import { joinClassNames } from '../../../utils/functions'

function Tag({ tag, faded, onClick }) {
  return (
    <p className={joinClassNames(
      faded ? " bg-green-400/50" : "bg-green-600/70",
      "text-sm w-max px-2 py1 rounded-md text-white m-1 min-w-[100px] text-center cursor-pointer select-none"
    )}
      onClick={onClick}
    >
      {tag.name}
    </p>
  )
}

export default Tag