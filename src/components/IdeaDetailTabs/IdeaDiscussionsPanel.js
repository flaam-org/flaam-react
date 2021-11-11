import { Tab } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import { getIdeaDiscussions, getNextIdeaDiscussions, selectIdeaDiscussions, selectLoading } from '../../slices/ideaDiscussionsSlice'
import CreateEditDiscussionModal from '../modals/CreateEditDiscussionModal'
import Button from '../utilComponents/Button'
import DiscussionCard from "../DiscussionCard"

function IdeaDiscussionsPanel() {

  const { ideaId } = useParams()
  const isLoading = useSelector(selectLoading)
  const ideaDiscussions = useSelector(selectIdeaDiscussions)
  const dispatch = useDispatch()
  const loadingRef = useRef()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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
      <Button variant="outline-primary" onClick={() => setIsCreateModalOpen(true)} >Add Discussion</Button>

      <div className="flex flex-col gap-3 my-3">
        {ideaDiscussions.map((discussion, index) => {

          if (index === ideaDiscussions.length - 1) {
            return (
              <div key={discussion.id} ref={setRef}>
                <DiscussionCard discussion={discussion} />
              </div>
            )
          }

          return <DiscussionCard discussion={discussion} key={discussion.id} />
        })}
      </div>

      <CreateEditDiscussionModal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} ideaId={ideaId} />
    </Tab.Panel>
  )
}

export default IdeaDiscussionsPanel
