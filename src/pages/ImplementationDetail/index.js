import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import { getSingleImplementationAsync, selectCurrentImplementation } from "../../slices/implementationSlice"
import ImplementationDetailTabs from "../../components/ImplementationDetailTabs"

function ImplementationDetail() {

  const { implementationId } = useParams()
  const implementation = useSelector(selectCurrentImplementation)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getSingleImplementationAsync(implementationId))

  }, [implementationId, dispatch])

  return (
    <div className="flex divide-x divide-gray-50 overflow-hidden pt-2 " >

      <ContentContainer className="flex-col space-y-1 overflow-auto keep-scrolling p-4 px-4 ml-2 bg-white rounded-l" >
        <h1 className="text-xl font-bold" >{implementation.title}</h1>

        <ImplementationDetailTabs />

      </ContentContainer>

      <NewsContainer className="mr-2 bg-white rounded-r min-h-screen">
        hngncgnsn
      </NewsContainer>

    </div>
  )
}

export default ImplementationDetail
