import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Main from "../../components/utilComponents/Main"
import ContentContainer from "../../components/utilComponents/ContentContainer"
import NewsContainer from "../../components/utilComponents/NewsContainer"

function Profile() {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 transition duration-500" >
      <Sidebar />


      <Main>
        <Header />
        <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
          <ContentContainer className="keep-scrolling overflow-auto flex-col space-y-3">
            <div className="h-48 w-full min-h-screen bg-white dark:bg-gray-800 rounded-lg py-5 px-3" >
              <div className="flex items-center justify-around px-5">
                <div className="h-48 w-48 rounded-full bg-gray-500"></div>
                <div> my name is Mohit Kumar </div>

              </div>

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

export default Profile
