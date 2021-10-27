import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyIdeasAsync, selectMyIdeas, selectLoading } from "../../../slices/myIdeasSlice"
import IdeaCard from '../../IdeaCard'
import IdeaCardShimmer from '../../IdeaCard/IdeaCardShimmer'

function MyIdeasTabPanel() {

  const myIdeas = useSelector(selectMyIdeas)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getMyIdeasAsync())

  }, [dispatch])

  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {myIdeas.map(idea => {

          return <IdeaCard idea={idea} key={idea.id} />
        })}

        {isLoading && myIdeas.length === 0 && (
          <>
            <IdeaCardShimmer />
            <IdeaCardShimmer />
            <IdeaCardShimmer />
          </>
        )}

      </div>
    </Tab.Panel>
  )
}

export default MyIdeasTabPanel
