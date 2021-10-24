import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookmarkedIdeasAsync, selectBookmarkedIdeas } from '../../../slices/bookmarkedIdeasSlice'
import IdeaCard from '../../IdeaCard'

function SavedTabPanel() {

  const bookmarkedIdeas = useSelector(selectBookmarkedIdeas)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookmarkedIdeasAsync())
  },[dispatch])

  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {bookmarkedIdeas.map(idea => {

          return <IdeaCard idea={idea} key={idea.id} />
        })}

      </div>
    </Tab.Panel>
  )
}

export default SavedTabPanel
