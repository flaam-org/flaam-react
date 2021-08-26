import React from 'react'
import {InformationCircleIcon} from "@heroicons/react/outline"

function index(props) {
  return (
    <span className="text-xs text-red-500 px-2 align-middle">
        <span className="inline-block">
          <InformationCircleIcon className="w-4 inline mr-2" />
        </span>
        <span className="inline-block">
          {props.children}
        </span>
  </span>
  )
}

export default index
