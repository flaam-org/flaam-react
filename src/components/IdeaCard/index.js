import React from 'react'
import Tag from '../utilComponents/Tag'
import { BookmarkIcon, ShareIcon } from "@heroicons/react/outline"
import { EyeIcon } from "@heroicons/react/solid"
import { format, isToday, isYesterday } from 'date-fns'

function formatCreatedAt(date) {

  const d = new Date(date)

  if (isToday(d)) return `Created Today`

  if (isYesterday(d)) return `Created Yesterday`

  return `Created on ${format(d, 'do MMMM, yyyy ')}`

}

function IdeaCard({ idea }) {

  const {
    title,
    // owner,
    owner_avatar,
    owner_username,
    description,
    // vote,
    tags,
    // view_count,
    // upvote_count,
    // downvote_count,
    // implementation_count,
    // bookmarked,
    view_count,
    created_at,
  } = idea


  return (
    <div className="bg-green-200/30 p-2 pt-3 rounded-lg grid grid-cols-8 gap-1 drop-shadow-xl shadow-md" >

      {/* image */}
      <div className="justify-center col-start-1 col-end-2 flex items-center" >
        <img className=" h-14 w-14 rounded-full bg-white/80 shadow-md object-contain" src={owner_avatar} alt={owner_username} />
      </div>

      {/* username and created at */}
      <div className="col-start-2 col-end-8 flex flex-col justify-center ">
        <p className="">
          {owner_username}
        </p>
        <p className="text-sm text-gray-600 flex divide-x " >
          <span className="pr-2">{formatCreatedAt(created_at)}</span>
          <span className="pl-2 flex items-center justify-between space-x-1" >
            <span>{view_count}</span>
            <EyeIcon className="w-3 h-3" />
          </span>
        </p>
      </div>

      {/* idea actions(share and bookmark) */}
      <div className="col-start-8 col-end-9 flex gap-2 text-center justify-around " >
        <div className="flex-1 cursor-pointer">
          <BookmarkIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 cursor-pointer" >
          <ShareIcon className="w-5 h-5" />
        </div>
      </div>


      <div className="col-start-1 col-end-2 flex flex-col gap-3 justify-around text-center" >
        <div className="" >
          <p className="text-4xl font-bold" >6</p>
          <p className="text-sm" >votes</p>
        </div>
        <div className="" >
          <p className="text-4xl font-bold" >2</p>
          <p className="text-sm" >projects</p>
        </div>
      </div>

      {/* content */}
      <div className="col-start-2 col-end-9 pr-5 flex flex-col">
        <div className="py-1 pb-2 " >
          <p className="bg-white/50 rounded-lg px-2 py-1" >{title}</p>
        </div>

        <div className="flex-1" >
          <p className="h-full bg-white/50 rounded-lg px-2 py-1" >{description}</p>
        </div>
      </div>

      {/* tags */}

      <div className="col-start-2 col-end-8 flex flex-wrap pt-2" >
        {tags.map(t => {
          return <Tag tag={t} key={t.id} />
        })}
      </div>

    </div>
  )
}

export default IdeaCard