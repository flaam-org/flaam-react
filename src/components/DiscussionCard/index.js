import React from 'react'
import { ArrowUpIcon, ArrowDownIcon, ShareIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { voteStates } from '../../utils/constants'
import { formatCreatedAt, joinClassNames } from '../../utils/functions'
import { useDispatch } from 'react-redux'
import { setDiscussionVoteAsync } from "../../slices/ideaDiscussionsSlice"


function DiscussionCard({ discussion, onRightArrowClick }) {

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

  const dispatch = useDispatch()

  function handleUpVoteClick() {
    switch (vote) {
      case voteStates.UP: dispatch(setDiscussionVoteAsync(id, voteStates.NEUTRAL, -1, 0));
        break;
      case voteStates.NEUTRAL: dispatch(setDiscussionVoteAsync(id, voteStates.UP, 1, 0));
        break;
      case voteStates.DOWN: dispatch(setDiscussionVoteAsync(id, voteStates.UP, 1, -1));
        break;
      default: break;
    }
  }

  function handleDownVoteClick() {
    switch (vote) {
      case voteStates.UP: dispatch(setDiscussionVoteAsync(id, voteStates.DOWN, -1, 1));
        break;
      case voteStates.NEUTRAL: dispatch(setDiscussionVoteAsync(id, voteStates.DOWN, 0, 1));
        break;
      case voteStates.DOWN: dispatch(setDiscussionVoteAsync(id, voteStates.NEUTRAL, 0, -1));
        break;
      default: break;
    }
  }

  return (
    <div className="p-2 pt-1 rounded-lg grid grid-cols-12 gap-1 drop-shadow-xl shadow-md border border-green-500 " >

      <div className=" col-start-1 col-end-11 pl-2 mr-2 overflow-hidden" >
        <p className="text-xs text-green-600/50 font-bold" >
          {owner_username} started this discussion on {formatCreatedAt(created_at)}
        </p>
      </div>

      <div className="col-start-11 col-end-13 flex gap-2 text-center justify-around " >
        <button className="flex-1 cursor-pointer" onClick={() => null} >
          <ShareIcon className="w-4 h-4" />
        </button>
        {/* <button className="flex-1 cursor-pointer" onClick={() => null} >
          <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-700" />
        </button> */}
      </div>


      <div className="col-start-1 col-end-2 flex flex-col gap-1 justify-center items-center text-center" >
        <ArrowUpIcon
          className={joinClassNames("w-6 h-6", vote === voteStates.UP ? "text-blue-600" : "text-gray-500")}
          onClick={() => handleUpVoteClick()}

        />
        <p>{Number(upvote_count) - Number(downvote_count)}</p>
        <ArrowDownIcon
          className={joinClassNames("w-6 h-6", vote === voteStates.DOWN ? "text-blue-600" : "text-gray-500")}
          onClick={() => handleDownVoteClick()}
        />
      </div>

      <div className="col-start-2 col-end-12 flex flex-col gap-2" >
        <p className="text-sm text-green-900 bg-green-300/20 rounded p-2" >
          {title}
        </p>
        <p className="text-sm text-green-900 bg-green-300/20 rounded p-2" >
          {body}
        </p>
      </div>

      <div className="col-start-12 col-end-13 flex items-center justify-center " >
        <div onClick={onRightArrowClick} className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-green-200/30 cursor-pointer transition-colors duration-100ease-in-out" >
          <ChevronRightIcon className="w-8 h-8 text-gray-800" />
        </div>
      </div>


    </div>
  )
}

export default DiscussionCard
