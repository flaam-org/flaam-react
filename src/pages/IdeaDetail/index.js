import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectLoading, selectCurrentIdea, getSingleIdeaAsync } from "../../slices/ideaSlice"
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import IdeaDetailTabs from '../../components/IdeaDetailTabs'



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
        <ContentContainer className="flex-col space-y-1 overflow-auto keep-scrolling p-4 px-4 ml-2 bg-white rounded-l">

          <h1 className="text-xl font-bold" >{idea.title}</h1>

          <IdeaDetailTabs />

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
