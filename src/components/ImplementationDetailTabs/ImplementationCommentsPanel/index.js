import React, { Fragment, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getImplementationCommentsAsync, getNextImplementationCommentsAsync, selectImplementationComments, selectLoading } from '../../../slices/implementationComments'
import { useDispatch } from 'react-redux'
import useIsOnScreen from '../../../hooks/useIsOnScreen'
import { useParams } from 'react-router'
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import Button from "../../utilComponents/Button"
import PostComment from './PostComment'
import { Tab } from '@headlessui/react'
import DiscussionCommentCard from '../../DiscussionCommentCard'



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
    <Tab.Panel as={Fragment}>
      <div className="flex flex-col gap-3 my-3">

        <PostComment implementationId={implementationId} />

        {implementationComments.map((comment, index) => {

          if (index === implementationComments.length - 1) {
            return (
              <div key={comment.id} ref={setRef} >
                <DiscussionCommentCard comment={comment} />
              </div>
            )
          }

          return <DiscussionCommentCard comment={comment} key={comment.id} />
        })}

      </div>
    </Tab.Panel>

  )
}

export default ImplementationCommentsPanel
