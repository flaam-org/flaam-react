import { Tab } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import { getMyImplementationsAsync, getNextMyImplementationsAsync, selectLoading, selectMyImplementations } from '../../../slices/myImplementationsSlice'
import ImplementationCard from "../../ImplementationCard"
import ImplementationCardShimmer from "../../ImplementationCard/ImplementationCardShimmer"

function MyImplementationTabPanel() {

  const myImplementations = useSelector(selectMyImplementations)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  const loadingRef = useRef()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: '0px', threshold: 0.1 })

  useEffect(() => {
    dispatch(getMyImplementationsAsync())
  }, [dispatch])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextMyImplementationsAsync())
    }

  }, [isVisible, dispatch])



  return (
    <Tab.Panel>
            <div className="flex flex-col space-y-3 mt-2 ">
        {myImplementations.map((imp, index) => {

          if (index === myImplementations.length - 1) {
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

export default MyImplementationTabPanel
