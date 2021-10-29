import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IdeaCard from '../../components/IdeaCard'
import IdeaCardShimmer from '../../components/IdeaCard/IdeaCardShimmer'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import { addIdeaToBookmarksAsync, addToFeedAsync, deleteIdeaFromBookmarkAsync, getFeedAsync, selectFeed, selectLoading } from '../../slices/feedSlice'


function Feed() {

  const feed = useSelector(selectFeed)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const loadingRef = useRef()

  const { setRef, isVisible } = useIsOnScreen({ root: null, rootMargin: "0px", threshold: 1 })

  useEffect(() => {
    loadingRef.current = isLoading
  },[isLoading])

  useEffect(() => {
      dispatch(getFeedAsync())
  },[dispatch])

  useEffect(() => {

    if (!loadingRef.current && isVisible) {
      dispatch(addToFeedAsync())
    }

  }, [isVisible, dispatch])



  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex-col space-y-3 overflow-auto keep-scrolling py-5 mx-2 bg-white">

        {feed.map((idea, index) => {

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

          if (index === feed.length-1) {
            return (
              <div ref={setRef} key={idea.id} >
                <IdeaCard idea={idea} handleBookmarkClick={handleBookmarkClick} />
              </div>
            )
          }

          return <IdeaCard idea={idea} key={idea.id} handleBookmarkClick={handleBookmarkClick} />
        })}

        {isLoading && (
          <>
            <IdeaCardShimmer />
            <IdeaCardShimmer />
            <IdeaCardShimmer />
            <IdeaCardShimmer />
            <IdeaCardShimmer />
          </>
        )}

      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>
    </div>

  )
}

export default Feed