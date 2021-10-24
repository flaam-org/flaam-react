import React, { useState } from 'react'
import Tag from '../utilComponents/Tag'
import { BookmarkIcon, ShareIcon } from "@heroicons/react/outline"
import { EyeIcon } from "@heroicons/react/solid"
import { format, isToday, isYesterday } from 'date-fns'
import { joinClassNames } from '../../utils/functions'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../slices/userSlice'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import Modal from '../utilComponents/Modal'
import handleClickEye from "../utilComponents/Modal"

function formatCreatedAt(date) {

  const d = new Date(date)

  if (isToday(d)) return `Created Today`

  if (isYesterday(d)) return `Created Yesterday`

  return `Created on ${format(d, 'do MMMM, yyyy ')}`

}

function IdeaCard({ idea, handleBookmarkClick }) {

  const currentUserId = useSelector(selectUserId)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const {
    title,
    owner,
    owner_avatar,
    owner_username,
    description,
    vote,
    tags,
    // upvote_count,
    // downvote_count,
    implementation_count,
    bookmarked,
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
            <EyeIcon className="w-3 h-3" onClick={() => handleClickEye.click()} />
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
          <p className="text-4xl font-bold" >{implementation_count}</p>
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

      <div className="col-start-8 col-end-9 flex items-center justify-center" >
        <Link to={routes.IDEA_DETAIL(idea.id)} className="text-center text-xs py-1 px-2 border-2 border-black/50 rounded-full hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out" >

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

export default IdeaCard