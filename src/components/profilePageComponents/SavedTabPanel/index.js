import { Tab } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import { getBookmarkedIdeasAsync, getNextBookmarkedIdeasAsync, selectBookmarkedIdeas, selectLoading } from '../../../slices/bookmarkedIdeasSlice'
import IdeaCard from '../../IdeaCard'
import IdeaCardShimmer from '../../IdeaCard/IdeaCardShimmer'

function SavedTabPanel() {

  const isLoading = useSelector(selectLoading)
  const bookmarkedIdeas = useSelector(selectBookmarkedIdeas)
  const dispatch = useDispatch()
  const { username } = useParams()

  const loadingRef = useRef()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.1 })

  useEffect(() => {
    dispatch(getBookmarkedIdeasAsync(username === "s" ? undefined : username))
  }, [username,dispatch])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useUpdateEffect(() => {

    if (!loadingRef.current && isVisible) {
      dispatch(getNextBookmarkedIdeasAsync(username === "s" ? undefined : username))
    }

  }, [username, isVisible, dispatch])

  console.log(username)

  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {bookmarkedIdeas.map((idea, index) => {

          if (index === bookmarkedIdeas.length - 1)
            return <div ref={setRef} key={idea.id} >
              <IdeaCard idea={idea} />
            </div>

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
