import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postCommentAsync } from '../../../slices/discussionCommentsSlice'
import Button from '../../utilComponents/Button'

function PostComment({ discussionId }) {

  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()


  async function handleCommentPost() {
    setLoading(true)

    await dispatch(postCommentAsync(discussionId, comment))

    setLoading(false)
    // console.log('posting comment')

  }
  console.log(comment)

  return (
    <div className="flex gap-1" >
      <input className="border rounded flex-1 py-1 px-2 focus:ring focus:ring-blue-300/30 outline-none" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleCommentPost} loading={loading} disabled={loading} >POST</Button>
    </div>
  )
}

export default PostComment
