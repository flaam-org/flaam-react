import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentIdea, selectLoading, setIdeaVoteAsync } from '../../slices/ideaSlice'
import Tag from "../utilComponents/Tag"
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon } from "@heroicons/react/outline"
import { joinClassNames } from '../../utils/functions'
import LoadingSpinner from "../utilComponents/LoadingSpinner"
import Button from "../utilComponents/Button"
import CreateImplementationModal from '../CreateImplementationModal'

const ideaVoteStates = {
  UP: 1,
  NEUTRAL: 0,
  DOWN: -1
}

function IdeaDetailPanel() {

  const idea = useSelector(selectCurrentIdea)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const [isImplementationModalOpen, setIsImplementationModalOpen] = useState(false)

  function handleUpVoteClick() {

    console.log("clicked");

    switch (idea.vote) {

      case ideaVoteStates.UP: dispatch(setIdeaVoteAsync(idea.id, ideaVoteStates.NEUTRAL, -1, 0))
        break;

      case ideaVoteStates.NEUTRAL:
        console.log("reached");
        dispatch(setIdeaVoteAsync(idea.id, ideaVoteStates.UP, 1, 0))
        break;

      case ideaVoteStates.DOWN: dispatch(setIdeaVoteAsync(
        idea.id, ideaVoteStates.UP, 1, -1
      ))
        break;

      default: break;
    }

  }


  function handleDownVoteClick() {

    switch (idea.vote) {

      case ideaVoteStates.DOWN: dispatch(setIdeaVoteAsync(idea.id, ideaVoteStates.NEUTRAL, 0, -1))
        break;

      case ideaVoteStates.NEUTRAL: dispatch(setIdeaVoteAsync(idea.id, ideaVoteStates.DOWN, 0, 1))
        break;

      case ideaVoteStates.UP: dispatch(setIdeaVoteAsync(idea.id, ideaVoteStates.DOWN, -1, 1))
        break;

      default: break;

    }

  }

  return (
    <Tab.Panel>

      {isLoading ? (
        <div className="flex items-center justify-center flex-1 mt-10 text-gray-500 space-x-2 text-sm " >
          <LoadingSpinner className="h-8 w-8" />
          <span>loading please wait...</span>
          {/* its loading */}
        </div>) : (
        <>
          <div className="flex flex-wrap" >
            {idea?.tags?.map(t => {

              return <Tag tag={t} key={t.id} />
            })}
          </div>
          <p className="text-gray-600 py-2   ">
            {idea.description}
          </p>

          <p className="py-2" >
            {idea.body}
          </p>

          <ul>
            <h2 className="text-lg font-bold" >Milestones</h2>
            {idea?.milestones?.map((m, index) => {

              return <li className="" key={`${m[0]}--key-${index}`} >{m[1]}</li>
            })}
          </ul>

          {/* actions */}
          <div className="flex py-4 space-x-2 ">
            <div className="cursor-pointer" onClick={() => handleUpVoteClick()} >
              <ChevronDoubleUpIcon className={joinClassNames(idea.vote === ideaVoteStates.UP ? " text-blue-600" : "text-gray-500",
                "h-6 w-6 inline")} />
              <span>{idea.upvote_count}</span>
            </div>

            <div className="cursor-pointer" onClick={() => handleDownVoteClick()} >
              <ChevronDoubleDownIcon className={joinClassNames(
                idea.vote === ideaVoteStates.DOWN ? "text-blue-600" : "text-gray-500",
                "h-6 w-6 inline"
              )} />
              <span>{idea.downvote_count}</span>
            </div>
            <Button variant="outline-secondary" type="button" onClick={() => setIsImplementationModalOpen(true)}  >Add your Implementation</Button>
          </div>
        </>
      )}

      <CreateImplementationModal show={isImplementationModalOpen} onClose={() => setIsImplementationModalOpen(false) }  />

    </Tab.Panel>
  )
}

export default IdeaDetailPanel
