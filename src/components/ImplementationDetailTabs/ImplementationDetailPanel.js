import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentImplementation, selectLoading, setImplementationVoteAsync } from '../../slices/implementationSlice'
import Tag from "../utilComponents/Tag"
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon } from "@heroicons/react/outline"
import { joinClassNames } from '../../utils/functions'
import LoadingSpinner from "../utilComponents/LoadingSpinner"
import Button from "../utilComponents/Button"
import CreateImplementationModal from '../CreateImplementationModal'

const voteStates = {
  UP: 1,
  NEUTRAL: 0,
  DOWN: -1
}

function ImplementationDetailPanel() {

  const implementation = useSelector(selectCurrentImplementation)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const [isImplementationModalOpen, setIsImplementationModalOpen] = useState(false)

  function handleUpVoteClick() {


    switch (implementation.vote) {

      case voteStates.UP: dispatch(setImplementationVoteAsync(implementation.id, voteStates.NEUTRAL, -1, 0))
        break;

      case voteStates.NEUTRAL:
        dispatch(setImplementationVoteAsync(implementation.id, voteStates.UP, 1, 0))
        break;

      case voteStates.DOWN: dispatch(setImplementationVoteAsync(
        implementation.id, voteStates.UP, 1, -1
      ))
        break;

      default: break;
    }

  }


  function handleDownVoteClick() {

    switch (implementation.vote) {

      case voteStates.DOWN: dispatch(setImplementationVoteAsync(implementation.id, voteStates.NEUTRAL, 0, -1))
        break;

      case voteStates.NEUTRAL: dispatch(setImplementationVoteAsync(implementation.id, voteStates.DOWN, 0, 1))
        break;

      case voteStates.UP: dispatch(setImplementationVoteAsync(implementation.id, voteStates.DOWN, -1, 1))
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
            {implementation?.tags?.map(t => {

              return <Tag tag={t} key={t.id} />
            })}
          </div>
          <p className="text-gray-600 py-2   ">
            {implementation.description}
          </p>

          <p className="py-2" >
            {implementation.body}
          </p>

          <ul>
            <h2 className="text-lg font-bold" >Milestones</h2>
            {implementation?.milestones?.map((m, index) => {

              return <li className="" key={`${m[0]}--key-${index}`} >{m[1]}</li>
            })}
          </ul>

          {/* actions */}
          <div className="flex py-4 space-x-2 ">
            <div className="cursor-pointer" onClick={() => handleUpVoteClick()} >
              <ChevronDoubleUpIcon className={joinClassNames(implementation.vote === voteStates.UP ? " text-blue-600" : "text-gray-500",
                "h-6 w-6 inline")} />
              <span>{implementation.upvote_count}</span>
            </div>

            <div className="cursor-pointer" onClick={() => handleDownVoteClick()} >
              <ChevronDoubleDownIcon className={joinClassNames(
                implementation.vote === voteStates.DOWN ? "text-blue-600" : "text-gray-500",
                "h-6 w-6 inline"
              )} />
              <span>{implementation.downvote_count}</span>
            </div>
            <Button variant="outline-secondary" type="button" onClick={() => setIsImplementationModalOpen(true)}  >Add your Implementation</Button>
          </div>
        </>
      )}

      <CreateImplementationModal show={isImplementationModalOpen} onClose={() => setIsImplementationModalOpen(false)} />

    </Tab.Panel>
  )
}

export default ImplementationDetailPanel