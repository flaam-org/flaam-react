import { Tab } from '@headlessui/react'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import { getIdeaDiscussions, getNextIdeaDiscussions, selectIdeaDiscussions, selectLoading } from '../../slices/ideaDiscussionsSlice'

function IdeaDiscussionsPanel() {

  const { ideaId } = useParams()
  const isLoading = useSelector(selectLoading)
  const ideaDiscussions = useSelector(selectIdeaDiscussions)
  const dispatch = useDispatch()
  const loadingRef = useRef()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.1 })

  useEffect(() => {
    dispatch(getIdeaDiscussions(ideaId))
  }, [dispatch, ideaId])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextIdeaDiscussions(ideaId))
    }
  }, [isVisible, dispatch, ideaId])

  console.log(ideaDiscussions)


  return (
    <Tab.Panel>
      Idea discussions
    </Tab.Panel>
  )
}

export default IdeaDiscussionsPanel
