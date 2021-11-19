import { Tab } from '@headlessui/react'
import React from 'react'
import CustomTab from '../utilComponents/CustomTab'
import ImplementationDetailPanel from "./ImplementationDetailPanel"
import ImplementationCommentsPanel from './ImplementationCommentsPanel'



function IdeaDetailTabs() {
  return (
    <Tab.Group as="div" className="w-full px-2 py-3 sm:px-0 " >
      <Tab.List className="flex py-1 px-2 space-x-2 rounded-md border-b">

        <CustomTab>Details</CustomTab>
        <CustomTab>Comments</CustomTab>


      </Tab.List>
      <Tab.Panels className="mt-2 px-2 h-[80vh] overflow-y-scroll keep-scrolling">

        <ImplementationDetailPanel />
        <ImplementationCommentsPanel />

      </Tab.Panels>



    </Tab.Group>
  )
}

export default IdeaDetailTabs
