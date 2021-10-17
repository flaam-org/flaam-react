import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IdeaCard from '../../components/IdeaCard'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import { addIdeaToBookmarksAsync, deleteIdeaFromBookmarkAsync, getFeedAsync, selectFeed } from '../../slices/feedSlice'


function Feed() {

  const feed = useSelector(selectFeed)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFeedAsync())
  }, [dispatch])



  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex-col space-y-3 overflow-auto keep-scrolling py-5 mx-2 bg-white">

        {feed.map(idea => {

          function handleBookmarkClick() {

            if (idea.bookmarked) {
              dispatch(deleteIdeaFromBookmarkAsync(idea.id))
            }
            else {
              console.log("clicked")
              dispatch(addIdeaToBookmarksAsync(idea.id))
            }

            console.log(idea)

          }

          return <IdeaCard idea={idea} key={idea.id} handleBookmarkClick={handleBookmarkClick} />
        })}

      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>
    </div>

  )
}

export default Feed