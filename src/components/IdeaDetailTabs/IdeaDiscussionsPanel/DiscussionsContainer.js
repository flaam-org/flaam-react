import React, { useRef, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import useIsOnScreen from "../../../hooks/useIsOnScreen"
import { getIdeaDiscussions, getNextIdeaDiscussions, selectLoading, selectIdeaDiscussions } from "../../../slices/ideaDiscussionsSlice"
import useUpdateEffect from "../../../hooks/useUpdateEffect"
import DiscussionCard from "../../DiscussionCard"
import Button from "../../utilComponents/Button"
import CreateEditDiscussionModal from "../../modals/CreateEditDiscussionModal"


function DiscussionsContainer({ ideaId, onDiscussionSelect }) {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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
    <div className="flex flex-col gap-3 my-3">

      <Button variant="primary" onClick={() => setIsCreateModalOpen(true)} >Add Discussion</Button>


      {ideaDiscussions.map((discussion, index) => {

        if (index === ideaDiscussions.length - 1) {
          return (
            <div key={discussion.id} ref={setRef}>
              <DiscussionCard discussion={discussion} onRightArrowClick={() => onDiscussionSelect(discussion.id)} />
            </div>
          )
        }

        return <DiscussionCard discussion={discussion} key={discussion.id} onRightArrowClick={() => onDiscussionSelect(discussion.id)} />
      })}


      <CreateEditDiscussionModal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} ideaId={ideaId} />
    </div>
  )
}

export default DiscussionsContainer