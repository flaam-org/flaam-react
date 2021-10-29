import { Tab } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyIdeasAsync, selectMyIdeas, selectLoading, getNextMyIdeasAsync } from "../../../slices/myIdeasSlice"
import IdeaCard from '../../IdeaCard'
import IdeaCardShimmer from '../../IdeaCard/IdeaCardShimmer'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
function MyIdeasTabPanel() {

  const myIdeas = useSelector(selectMyIdeas)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.1 })

  useEffect(() => {
    dispatch(getMyIdeasAsync())
  }, [dispatch])

  useUpdateEffect(() => {

    if (!isLoading && isVisible) {
      dispatch(getNextMyIdeasAsync())
    }

  }, [isVisible, isLoading, dispatch])


  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {myIdeas.map((idea, index) => {

          if (index === myIdeas.length - 1) {
            return (
              <div ref={setRef} >
                <IdeaCard idea={idea} key={idea.id} />
              </div>
            )
          }

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

export default MyIdeasTabPanel
