import React from 'react'
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline"

function DiscussionCard({ discussion }) {

  const {
    id,
    title,
    body,
    vote,
    upvote_count,
    downvote_count,
    created_at,
    owner_username,
  } = discussion

  return (
    <div className="p-2 shadow-md rounded-md border" >
      {/* upvote down */}
      <div className="flex flex-col gap-1 items-center justify-center" >
        <ArrowUpIcon className="w-6 h-6" />
        <p>{vote}</p>
        <ArrowDownIcon className="w-6 h-6" />
      </div>
      {/* title */}
      <div className="" >
        {title}
      </div>
      {/* body */}
      <div className="text-sm" >
        {body}
      </div>
      {/* options */}
    </div>
  )
}

export default DiscussionCard
