import React, { useState, useEffect } from 'react'
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
import { selectLoading, selectCurrentIdea, getSingleIdeaAsync, updateIdeaAsync } from '../../slices/ideaSlice'
import { useParams } from "react-router-dom"
import useUpdateEffect from "../../hooks/useUpdateEffect"
import LoadingSpinner from '../../components/utilComponents/LoadingSpinner'

const validationSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  description: Yup.string().max(500, "Maximum length crossed.(500 character allowed)"),
  body: Yup.string().required("This field is required.")
})

function EditIdea() {

  const [tags, setTags] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const isLoading = useSelector(selectLoading)
  const milestones = useArray([])
  const { setArr, values: milestoneValues } = milestones
  // const history = useHistory()
  const dispatch = useDispatch()
  const idea = useSelector(selectCurrentIdea)
  const { ideaId } = useParams()


  useUpdateEffect(() => {
    setTags(idea ? idea.tags : [])
  }, [idea])

  useEffect(() => {
    setArr(idea.milestones ? idea.milestones.map(m => m[1]) : [])
  }, [idea, setArr])

  useEffect(() => {
    dispatch(getSingleIdeaAsync(ideaId))
  }, [dispatch, ideaId])

  const initialValues = {
    title: idea ? idea.title : "",
    description: idea ? idea.description : "",
    body: idea ? idea.body : "",
    // draft:true
  }


  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2 px-1" >
      <ContentContainer className="keep-scrolling overflow-auto flex-col space-y-3 bg-white pt-5 pb-32 px-3 h-full">

        <h1 className="font-bold uppercase text-2xl" >
          Edit Idea
        </h1>

        {isLoading ? (

          <div className="flex- items-center justify-center" >
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

              const idea = {
                ...values,
                tags: tags.map(t => t.id),
                milestones: milestoneValues
              }
              console.log(idea)

              setIsUpdating(true)
              await dispatch(updateIdeaAsync(ideaId,idea))
              setIsUpdating(false)

            }}
            onReset={(values) => {
              console.warn("Form reset complete.")
              setArr([])
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
                <Button variant="secondary" type="submit" loading={isUpdating} disabled={isUpdating} >Update</Button>
              </div>


            </Form>

          </Formik>
        )}



      </ContentContainer>

      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>
    </div>
  )
}

export default EditIdea
