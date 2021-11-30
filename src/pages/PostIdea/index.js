import React, { useState } from 'react'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { InputField, TextAreaField } from '../../components/formComponents/Input'
import Button from '../../components/utilComponents/Button'
import RelatedTags from '../../components/PostIdeaComponents/RelatedTags'
import useArray from '../../hooks/useArrayWithId'
import IdeaMilestones from "../../components/PostIdeaComponents/IdeaMileStones"
import { useDispatch, useSelector } from 'react-redux'
import { postIdeaAsync, selectLoading } from '../../slices/ideaSlice'
import { routes } from '../../utils/routeStrings'
import {useHistory} from "react-router-dom"

const validationSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  description: Yup.string().max(500, "Maximum length crossed.(500 character allowed)"),
  body: Yup.string().required("This field is required.")
})

function PostIdea() {

  const [tags, setTags] = useState([])
  const isLoading = useSelector(selectLoading)
  const milestones = useArray([])
  const history = useHistory()
  const dispatch = useDispatch()

  /**
   * TODO how to use `Draft`
   */


  const initialValues = {
    title: "",
    description: "",
    body: "",
    // draft:true
  }


  return (
        <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2 px-1" >
          <ContentContainer className="keep-scrolling overflow-auto flex-col space-y-3 bg-white dark:bg-gray-800 dark:text-white pt-5 pb-32 mx-2 h-full">

            <h1 className="font-bold uppercase text-2xl" >
              Create Post
            </h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {

                const idea = {
                  ...values,
                  tags: tags.map(t => t.id),
                  milestones: milestones.values
                }

                await dispatch(postIdeaAsync(idea));
                history.push(routes.FEED)


              }}
              onReset={(values) => {
                console.warn("Form reset complete.")
                milestones.setArr([])
                setTags([])
              }}
              validateOnChange

            >

              <Form>

                <InputField label="Title" type="text" name="title" labelClassName="" className=" w-full" labelSpanClassName="" placeholder="Small name to be given to your Idea..." />

                <RelatedTags tags={tags} setTags={setTags} />

                <TextAreaField label="description" placeholder="Briefly describe about your Idea...." name="description" labelClassName="block" className="w-full resize-none" labelSpanClassName="" rows="6" />

                <TextAreaField label="body" name="body" placeholder="Elaborate and include all details of the idea here..." rows="20" labelClassName="block" className="w-full" labelSpanClassName="" />

                <IdeaMilestones milestones={milestones} />

                <div className="flex space-x-2 mt-2 justify-end" >
                  <Button variant="outline-danger" type="reset" >Reset</Button>
                  <Button variant="secondary" type="submit" loading={isLoading} disabled={isLoading} >Post Idea </Button>
                </div>


              </Form>

            </Formik>


          </ContentContainer>

          <NewsContainer className="px-2" >
            <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
            </div>
          </NewsContainer>
        </div>
  )
}

export default PostIdea
