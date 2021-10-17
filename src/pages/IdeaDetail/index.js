import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectLoading, selectCurrentIdea, getSingleIdeaAsync } from "../../slices/ideaSlice"
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import Tag from "../../components/utilComponents/Tag"


function IdeaDetail() {

  const { ideaId } = useParams()
  const isLoading = useSelector(selectLoading)
  const idea = useSelector(selectCurrentIdea)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getSingleIdeaAsync(ideaId))

  }, [dispatch, ideaId])


  return (
    <div className="flex divide-x divide-gray-50 overflow-hidden pt-2 " >
      {idea && (
        <ContentContainer className="flex-col space-y-1 overflow-auto keep-scrolling px-2 py-3 ml-2 bg-white rounded-l min-h-screen">
          {/* <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" ></div> */}

          <h1 className="text-xl font-bold" >{idea.title}</h1>

          <div className="flex" >
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
