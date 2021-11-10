import React, { useEffect, useRef } from 'react'
import { Tab } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { getIdeaImplementationsAsync, getNextIdeaImplementationsAsync, selectIdeaImplementations, selectLoading } from '../../slices/ideaImplementationsSlice'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import ImplementationCard from '../ImplementationCard'
import ImplementationCardShimmer from '../ImplementationCard/ImplementationCardShimmer'
import { useParams } from 'react-router'

function IdeaImplementationsPanel() {

  const ideaImplementations = useSelector(selectIdeaImplementations)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const { ideaId } = useParams()

  const loadingRef = useRef()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: '0px', threshold: 0.1 })

  useEffect(() => {
    dispatch(getIdeaImplementationsAsync(ideaId))
  }, [dispatch, ideaId])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextIdeaImplementationsAsync(ideaId))
    }

  }, [ideaId, isVisible, dispatch])

  // console.log(myImplementations)
  console.log("isloading", isLoading)


  return (
    <Tab.Panel>
      <div className="flex flex-col space-y-3 mt-2 ">
        {ideaImplementations.map((imp, index) => {

          if (index === ideaImplementations.length - 1) {
            return (
              <div ref={setRef} key={imp.id} >
                <ImplementationCard implementation={imp} />
              </div>
            )
          }

          return <ImplementationCard implementation={imp} key={imp.id} />
        })}

        {isLoading && (
          <>
            <ImplementationCardShimmer />
            <ImplementationCardShimmer />
            <ImplementationCardShimmer />
          </>
        )}

      </div>
    </Tab.Panel>
  )
}

export default IdeaImplementationsPanel
