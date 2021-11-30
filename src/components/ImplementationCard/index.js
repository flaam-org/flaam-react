import React, { useState } from 'react'
import { BookmarkIcon, ShareIcon } from "@heroicons/react/outline"
import { EyeIcon } from "@heroicons/react/solid"
import { format, isToday, isYesterday } from 'date-fns'
import { joinClassNames } from '../../utils/functions'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../slices/userSlice'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import Modal from '../utilComponents/Modal'

function formatCreatedAt(date) {

  const d = new Date(date)

  if (isToday(d)) return `Created Today`

  if (isYesterday(d)) return `Created Yesterday`

  return `Created on ${format(d, 'do MMMM, yyyy ')}`

}

function ImplementationCard({ implementation, handleBookmarkClick }) {

  const currentUserId = useSelector(selectUserId)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const {
    title,
    owner,
    owner_avatar,
    owner_username,
    description,
    vote,
    completed_milestones,
    milestones,
    // tags,
    // upvote_count,
    // downvote_count,
    comments_count,
    bookmarked,
    view_count,
    created_at,
  } = implementation


  return (
    <div className="bg-blue-300/30 p-2 pt-3 rounded-lg grid grid-cols-8 gap-1 drop-shadow-xl shadow-md" >

      {/* image */}
      <div className="justify-center col-start-1 col-end-2 flex items-center" >
        <img className=" h-14 w-14 rounded-full bg-white/80 dark:bg-whitdark:text-gray-300e/20 shadow-md object-contain" src={owner_avatar} alt={owner_username} />
      </div>

      {/* username and created at */}
      <div className="col-start-2 col-end-8 flex flex-col justify-center ">
        <p className="">
          {owner_username}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-200 flex divide-x " >
          <span className="pr-2">{formatCreatedAt(created_at)}</span>
          <span className="pl-2 flex items-center justify-between space-x-1" >
            <span>{view_count}</span>
            <EyeIcon className="w-3 h-3" />
          </span>
        </p>
      </div>

      {/* idea actions(share and bookmark) */}
      <div className="col-start-8 col-end-9 flex gap-2 text-center justify-around " >
        <button
          className="block flex-1 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed "
          disabled={currentUserId === owner}
          onClick={() => handleBookmarkClick()}
        >
          <BookmarkIcon className={joinClassNames(
            "w-5 h-5",
            bookmarked && currentUserId !== owner ? "text-yellow-300 fill-current" : "")} />
        </button>
        <button className="flex-1 cursor-pointer" onClick={() => setIsShareModalOpen(true)} >
          <ShareIcon className="w-5 h-5" />
        </button>
      </div>


      <div className="col-start-1 col-end-2 flex flex-col gap-3 justify-around text-center" >
        <div className="" >
          <p className="text-4xl font-bold" >{vote}</p>
          <p className="text-sm" >votes</p>
        </div>
        <div className="" >
          <p className="text-4xl font-bold" >{comments_count}</p>
          <p className="text-sm" >comments</p>
        </div>
      </div>

      {/* content */}
      <div className="col-start-2 col-end-9 pr-5 flex flex-col">
        <div className="py-1 pb-2 " >
          <p className="bg-white/50 dark:bg-white/20 rounded-lg px-2 py-1" >{title}</p>
        </div>

        <div className="flex-1" >
          <p className="h-full bg-white/50 dark:bg-white/20 rounded-lg px-2 py-1" >{description}</p>
        </div>
      </div>

      {/* completed milestones progress  */}

      <div className="col-start-2 col-end-8 flex flex-col pt-2" >

        <p className="text-xs text-black text-center select-none " >
          {Math.ceil((completed_milestones.length / milestones.length) * 100)}% completed
        </p>
        <div className="overflow-hidden w-full h-2 mb-4 flex rounded bg-blue-300 " >
          <div style={{ width: `${Math.ceil((completed_milestones.length / milestones.length)*100)}%` }} className="bg-blue-500" ></div>
        </div>

      </div>

      <div className="col-start-8 col-end-9 flex items-center justify-center" >
        <Link to={routes.IMPLEMENTATION_DETAIL(implementation.id)} className="text-center text-xs py-1 px-2 border-2 border-black/50 dark:border-white/50 rounded-full hover:bg-gray-500 dark:hover:bg-blue-100/20 hover:text-white transition duration-300 ease-in-out" >

          View Details
        </Link>
      </div>


      <Modal show={isShareModalOpen} onCancel={() => setIsShareModalOpen(false)}
        headline="Share Idea"
        onSubmit={() => null}
      >

        <div className="border">
          <input value={"something"} className="border" />
          <button type="button" className="border"  >
            copy to clipboard
          </button>
        </div>


      </Modal>


    </div>
  )
}

export default ImplementationCard