import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectLoading, selectDiscussionComments, getDiscussionCommentsAsync, getNextDiscussionCommentsAsync } from "../../../slices/discussionCommentsSlice"
import useIsOnScreen from "../../../hooks/useIsOnScreen"
import useUpdateEffect from "../../../hooks/useUpdateEffect"
import Button from "../../utilComponents/Button"


function DiscussionCommentsContainer({ discussionId, onBack }) {

  const isLoading = useSelector(selectLoading)
  const discussionComments = useSelector(selectDiscussionComments)
  const dispatch = useDispatch()
  const loadingRef = useRef()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 0.1 })

  useEffect(() => {
    dispatch(getDiscussionCommentsAsync(discussionId))
  }, [dispatch, discussionId])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useUpdateEffect(() => {
    if (!loadingRef.current && isVisible) {
      dispatch(getNextDiscussionCommentsAsync(discussionId))
    }
  }, [isVisible, dispatch, discussionId])

  console.log()


  return (
    <div className="flex flex-col gap-3 my-3">

      <Button variant="outline-primary" onClick={onBack} >BACK</Button>

    {discussionComments.map((comment, index) => {

      if (index === comment.length - 1) {
      return (
      <div key={comment.id} ref={setRef}>
    {/* <DiscussionCard discussion={discussion} onRightArrowClick={() => onDiscussionSelect(discussion.id)} /> */}
      vfdvfgv
      </div>
    )
    }

      return <div key={comment.id} ref={setRef}>
    {/* <DiscussionCard discussion={discussion} onRightArrowClick={() => onDiscussionSelect(discussion.id)} /> */}
      vfdvfgv
      </div>
    })}
    </div>
  )
}

export default DiscussionCommentsContainer