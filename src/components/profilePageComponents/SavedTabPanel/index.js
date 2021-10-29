import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import { getBookmarkedIdeasAsync, getNextBookmarkedIdeasAsync, selectBookmarkedIdeas, selectLoading } from '../../../slices/bookmarkedIdeasSlice'
import IdeaCard from '../../IdeaCard'
import IdeaCardShimmer from '../../IdeaCard/IdeaCardShimmer'

function SavedTabPanel() {

  const isLoading = useSelector(selectLoading)
  const bookmarkedIdeas = useSelector(selectBookmarkedIdeas)
  const dispatch = useDispatch()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.1 })

  useEffect(() => {
    dispatch(getBookmarkedIdeasAsync())
  }, [dispatch])

  useUpdateEffect(() => {

    if (!isLoading && isVisible) {
      console.log("next fetched")
      dispatch(getNextBookmarkedIdeasAsync())
    }

  }, [isVisible, isLoading, dispatch])


  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {bookmarkedIdeas.map((idea, index) => {

          if (index === bookmarkedIdeas.length - 1)
            return <div ref={setRef} ><IdeaCard idea={idea} key={idea.id} /></div>

          return <IdeaCard idea={idea} key={idea.id} />
        })}

        {isLoading && (
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

export default SavedTabPanel
