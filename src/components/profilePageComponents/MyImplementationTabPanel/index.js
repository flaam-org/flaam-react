import { Tab } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import { getMyImplementationsAsync, getNextMyImplementationsAsync, selectLoading, selectMyImplementations } from '../../../slices/myImplementationsSlice'

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

  console.log(myImplementations)


  return (
    <Tab.Panel>
      implenentation tab Panel
    </Tab.Panel>
  )
}

export default MyImplementationTabPanel
