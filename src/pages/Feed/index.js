import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { useDispatch } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import { getUserAsync } from '../../slices/userSlice'
import Main from '../../components/utilComponents/Main'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
// import {logout} from '../../slices/authSlice'
// import ThemeChangeFAB from "../../components/ThemeChangeFAB"

function Feed() {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUserAsync())
  // }, [dispatch])


  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 transition duration-500" >
      <Sidebar />


      <Main>
        <Header />
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
      </Main>

      {/* <ThemeChangeFAB /> */}
    </div>
  )
}

export default Feed