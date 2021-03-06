import { Tab } from '@headlessui/react'
import React from 'react'
import CustomTab from '../utilComponents/CustomTab'
import IdeaDetailPanel from './IdeaDetailPanel'
import IdeaDiscussionsPanel from './IdeaDiscussionsPanel/'
import IdeaImplementationsPanel from './IdeaImplementationsPanel'



function IdeaDetailTabs() {
  return (
    <Tab.Group as="div" className="w-full px-2 py-3 sm:px-0 " >
      <Tab.List className="flex py-1 px-2 space-x-2 rounded-md border-b">

        <CustomTab>Details</CustomTab>
        <CustomTab>Discussions</CustomTab>
        <CustomTab>Implementations</CustomTab>


      </Tab.List>
      <Tab.Panels className="mt-2 px-2 h-[80vh] overflow-y-scroll keep-scrolling">

        <IdeaDetailPanel />
        <IdeaDiscussionsPanel />
        <IdeaImplementationsPanel />

      </Tab.Panels>



    </Tab.Group>
  )
}

export default IdeaDetailTabs
