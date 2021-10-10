import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {getMyIdeasAsync} from "../../../slices/myIdeasSlice"

function MyIdeasTabPanel() {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getMyIdeasAsync())

  },[dispatch])

  return (
    <Tab.Panel>
      my ideas
    </Tab.Panel>
  )
}

export default MyIdeasTabPanel
