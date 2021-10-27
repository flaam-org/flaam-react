import { Tab } from '@headlessui/react'
import React from 'react'
import CustomTab from '../../utilComponents/CustomTab'
import MyImplementationTabPanel from '../MyImplementationTabPanel'
import MyIdeasTabPanel from '../MyIdeasTabPanel'
import SavedTabPanel from '../SavedTabPanel'

function TabsContainer() {
  return (
    <Tab.Group as="div" className="w-full px-2 py-3 sm:px-0 snap-start "  >
      <Tab.List className="flex py-1 px-2 space-x-2 rounded-md border-b">

        <CustomTab>Saved</CustomTab>
        <CustomTab>My Ideas</CustomTab>
        <CustomTab>My Implementations</CustomTab>


      </Tab.List>
      <Tab.Panels className="mt-2 px-2 h-[80vh] overflow-y-scroll keep-scrolling">
        <SavedTabPanel />
        <MyIdeasTabPanel />
        <MyImplementationTabPanel />
      </Tab.Panels>
    </Tab.Group>
  )
}

export default TabsContainer
