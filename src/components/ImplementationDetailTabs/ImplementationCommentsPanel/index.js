import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getImplementationCommentsAsync, getNextImplementationCommentsAsync, selectImplementationComments, selectLoading } from '../../../slices/implementationComments'
import { useDispatch } from 'react-redux'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import { useParams } from 'react-router'
import useUpdateEffect from '../../../hooks/useUpdateEffect'


function ImplementationCommentsPanel() {

  const isLoading = useSelector(selectLoading)
  const implementationComments = useSelector(selectImplementationComments)
  const dispatch = useDispatch()
  const loadingRef = useRef()

  const { implementationId } = useParams()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: '0px', threshold: 0.1 })

  useEffect(() => {
    dispatch(getImplementationCommentsAsync(implementationId))
  }, [implementationId, dispatch])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextImplementationCommentsAsync(implementationId))
    }

  }, [implementationId, dispatch, isVisible])

  console.log(implementationComments)

  return (
    <div>
      comments
    </div>
  )
}

export default ImplementationCommentsPanel
