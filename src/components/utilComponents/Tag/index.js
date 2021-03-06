import React from 'react'
import { joinClassNames } from '../../../utils/functions'
import { XCircleIcon } from "@heroicons/react/solid"

function Tag({ tag, faded, onClick,editMode=false, onDelete }) {
  return (
    <p className={joinClassNames(
      faded ? " bg-gray-300 opacity-60" : "bg-green-600/70",
      "text-xs w-max rounded-full text-white m-1 min-w-[100px] text-center select-none",
      editMode ? "flex justify-between items-center": ""
    )}
      onClick={onClick ? onClick : null}
    >
      <span className={editMode ? "pl-3 pr-2 " : "pb-0.5 px-2"} >
        {tag.name}
      </span>
      {editMode && <XCircleIcon className="h-4 w-4 cursor-pointer mr-0.5 hover:scale-105 hover:text-green-900 transition duration-100 ease-in-out" onClick={onDelete} />}
    </p>
  )
}

export default Tag