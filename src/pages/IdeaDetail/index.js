import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectLoading, selectCurrentIdea, getSingleIdeaAsync, setIdeaVoteAsync } from "../../slices/ideaSlice"
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import Tag from "../../components/utilComponents/Tag"
import { ChevronDoubleUpIcon, ChevronDoubleDownIcon } from "@heroicons/react/outline"
import { joinClassNames } from '../../utils/functions'

const ideaVoteStates = {
  UP: 1,
  NEUTRAL: 0,
  DOWN: -1
}

function IdeaDetail() {

  const { ideaId } = useParams()
  const isLoading = useSelector(selectLoading)
  const idea = useSelector(selectCurrentIdea)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getSingleIdeaAsync(ideaId))

  }, [dispatch, ideaId])

  function handleUpVoteClick() {

    console.log("clicked");

    switch (idea.vote) {

      case ideaVoteStates.UP: dispatch(setIdeaVoteAsync(ideaId, ideaVoteStates.NEUTRAL, -1, 0))
        break;

      case ideaVoteStates.NEUTRAL:
        console.log("reached");
        dispatch(setIdeaVoteAsync(ideaId, ideaVoteStates.UP, 1, 0))
        break;

      case ideaVoteStates.DOWN: dispatch(setIdeaVoteAsync(
        ideaId, ideaVoteStates.UP, 1, -1
      ))
        break;

      default: break;
    }

  }


  function handleDownVoteClick() {

    switch (idea.vote) {

      case ideaVoteStates.DOWN: dispatch(setIdeaVoteAsync(ideaId, ideaVoteStates.NEUTRAL, 0, -1))
        break;

      case ideaVoteStates.NEUTRAL: dispatch(setIdeaVoteAsync(ideaId, ideaVoteStates.DOWN, 0, 1))
        break;

      case ideaVoteStates.UP: dispatch(setIdeaVoteAsync(ideaId, ideaVoteStates.DOWN, -1, 1))
        break;

      default: break;

    }

  }


  return (
    <div className="flex divide-x divide-gray-50 overflow-hidden pt-2 " >
      {idea && (
        <ContentContainer className="flex-col space-y-1 overflow-auto keep-scrolling p-4 px-4 pb-10 ml-2 bg-white rounded-l">

          <h1 className="text-xl font-bold" >{idea.title}</h1>

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
            <p className="cursor-pointer" >
              choose to implement
            </p>
          </div>

        </ContentContainer>
      )}
      <NewsContainer className="mr-2 bg-white rounded-r min-h-screen" >
        {/* <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800"></div> */}
        csdcnskjdn
      </NewsContainer>
    </div>
  )
}

export default IdeaDetail
