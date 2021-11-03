import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'

function ImplementationDetail() {

  const { implementationId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {



  }, [dispatch])

  return (
    <div className="flex divide-x divide-gray-50 overflow-hidden pt-2 " >

      <ContentContainer className="flex-col space-y-1 overflow-auto keep-scrolling p-4 px-4 ml-2 bg-white rounded-l" >
        hbkjv vvnlekf
      </ContentContainer>

      <NewsContainer className="mr-2 bg-white rounded-r min-h-screen">
        hngncgnsn
      </NewsContainer>

    </div>
  )
}

export default ImplementationDetail
