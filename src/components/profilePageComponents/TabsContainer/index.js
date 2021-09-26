import { Tab } from '@headlessui/react'
import React from 'react'
import { joinClassNames } from '../../../utils/functions'
import ImplementationTabPanel from '../ImplementationTabPanel'
import ProjectsTabPanel from '../ProjectsTabPanel'
import SavedTabPanel from '../SavedTabPanel'

const TTab = ({ children }) => {
  return (
    <Tab

      className={({ selected }) =>
        joinClassNames(
          'w-full py-2 capitalize leading-5 focus:outline-none select-none transition-colors duration-150 ease-in-out',
          selected
            ? 'bg-transparent border-b-2 border-blue-500 text-green-600 font-bold '
            : 'text-green-400 hover:text-green-400/90 border-b-2 border-transparent hover:border-blue-500/60 '
        )
      }>{children}</Tab>
  )
}

function TabsContainer() {
  return (
    <Tab.Group as="div" className="w-full px-2 py-3 sm:px-0 snap-start "  >
      <Tab.List className="flex py-1 px-2 space-x-2 rounded-md">

        <TTab>Saved</TTab>
        <TTab>My Projects</TTab>
        <TTab>My Implementations</TTab>


      </Tab.List>
      <Tab.Panels className="mt-2 px-2 h-[80vh]">
        <SavedTabPanel />
        <ProjectsTabPanel />
        <ImplementationTabPanel />
      </Tab.Panels>
    </Tab.Group>
  )
}

export default TabsContainer
