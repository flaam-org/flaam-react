import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Main from '../../components/utilComponents/Main'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { InputField, TextAreaField } from '../../components/formComponents/Input'
import Button from '../../components/utilComponents/Button'


const validationSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  description: Yup.string().max(500, "Maximum length crossed.(500 character allowed)"),
  body: Yup.string().required("This field is required.")
})

function PostIdea() {


  /**
   * TODO make component to add tags
   * TODO make component to add milestones
   *      -> initially show 1 empty textField
   *      -> as user types in the first field create a new empty text field
   *      -> LOGIC check if the last milestone is empty
   *            -> if yes then dont create a new text field
   *            -> if no then add a new text field at the end.
   * TODO how to use `Draft`
   */


  const initialValues = {
    title: "",
    description: "",
    body: "",
    // draft:true
  }


  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 transition duration-500" >
      <Sidebar />

      <Main>
        <Header />

        <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2 px-1" >
          <ContentContainer className="keep-scrolling overflow-auto flex-col space-y-3 bg-white pt-5 pb-32 px-3 h-full">

            <h1 className="font-bold uppercase text-2xl" >
              Create Post
            </h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values)
              }}
              onReset={(values) => {
                console.warn("Form reset complete.")
              }}
              validateOnChange

            >

              <Form className="" >

                <InputField label="Title" type="text" name="title" labelClassName="" className=" w-full" labelSpanClassName="" placeholder="Small name to be given to your Idea..." />

                <TextAreaField label="description" placeholder="Briefly describe about your Idea...." name="description" labelClassName="block" className="w-full resize-none" labelSpanClassName="" rows="6" />

                <TextAreaField label="body" name="body" placeholder="Elaborate and include all details of the idea here..." rows="20" labelClassName="block" className="w-full" labelSpanClassName="" />

                <div className="flex space-x-2 mt-2 justify-end" >
                  <Button variant="outline-danger" type="reset" >Reset</Button>
                  <Button variant="secondary" >Post Idea </Button>

                </div>


              </Form>

            </Formik>


          </ContentContainer>

          <NewsContainer className="px-2" >
            <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
            </div>
          </NewsContainer>
        </div>


      </Main>

    </div>
  )
}

export default PostIdea
