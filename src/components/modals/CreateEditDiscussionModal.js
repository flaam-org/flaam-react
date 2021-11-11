import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { InputField, TextAreaField } from '../formComponents/Input'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { postDiscussionAsync } from '../../slices/ideaDiscussionsSlice'


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Discussion title is required'),
  body: Yup.string()
})

function CreateEditDiscussionModal({ show, onClose, ideaId, editMode, discussionInitValue }) {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  return (
    <Modal
      show={show}
      onCancel={onClose}
      headline={editMode ? 'Edit Discussion' : 'Create Discussion'}
      onSubmit={() => null}
    >

      <Formik
        initialValues={{
          title: discussionInitValue?.name ? discussionInitValue.name : '',
          body: discussionInitValue?.description ? discussionInitValue.description : ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values)
          setIsLoading(true)

          if (editMode) {
            // await dispatch(updateCategoryAsync (discussionInitValue.id, values))
            // dispatch for update
          } else {
            // await dispatch(postCategoryAsync(values))
            // dispatch for create
            const result = await dispatch(postDiscussionAsync({ idea: ideaId, ...values }))

            if(result.status === 201) {
              onClose()
            }
          }

          setIsLoading(false)
        }}
        validateOnChange
      >

        <Form>

          <InputField
            label="title"
            name="title"
            type="text"
            labelClassName="block mb-2 w-full"
            className="block w-full text-sm"
            placeholder="Discussion Title"
          />

          <TextAreaField
            label="Body"
            name="body"
            labelClassName="block"
            className="w-full resize-none"
            labelSpanClassName=""
            placeholder="Brief description about the Discussion..."
            rows="4"
          />



          <div className="flex justify-end items-center gap-3" >
            <Button variant="outline-danger" type="button" onClick={onClose} >
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading} >
              {editMode ? 'Update' : 'Create'}
            </Button>
          </div>

        </Form>

      </Formik>

    </Modal>
  )
}

export default CreateEditDiscussionModal