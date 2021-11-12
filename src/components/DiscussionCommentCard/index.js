import React from 'react'

function DiscussionCommentCard({ comment }) {

  const {
    // id,
    // discussion,
    body,
    owner_avatar,
    // owner_username,
    // created_at,
  } = comment

  return (
    <div className="bg-red rounded-md flex items-center gap-2" >
      <img className="h-10 w-10 rounded-full border shadow-md" src={owner_avatar} alt="" />
      <p className="shadow-md max-w-[80%] min-w-[300px]   p-2 text-sm" >
        {body}
      </p>
    </div>
  )
}

export default DiscussionCommentCard
