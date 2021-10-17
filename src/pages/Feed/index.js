import React from 'react'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'


function Feed() {

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex-col space-y-1 overflow-auto keep-scrolling pb-10 px-2">
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
        <div className="h-48 p-3 rounded shadow-lg w-full flex-shrink-0 bg-white dark:bg-gray-800" >
        </div>
      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>
    </div>

  )
}

export default Feed