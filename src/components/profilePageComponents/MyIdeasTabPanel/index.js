import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyIdeasAsync, selectMyIdeas } from "../../../slices/myIdeasSlice"
import IdeaCard from '../../IdeaCard'

function MyIdeasTabPanel() {

  const myIdeas = useSelector(selectMyIdeas)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getMyIdeasAsync())

  }, [dispatch])

  console.log(myIdeas);

  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {myIdeas.map(idea => {

          return <IdeaCard idea={idea} key={idea.id} />
        })}

      </div>
    </Tab.Panel>
  )
}

export default MyIdeasTabPanel
