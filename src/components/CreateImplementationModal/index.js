import { Formik, Form } from 'formik'
import React from 'react'
import { InputField } from '../formComponents/Input'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { postImplementationAsync, selectLoading } from "../../slices/implementationSlice"
import { useHistory, useParams } from 'react-router'
import { routes } from "../../utils/routeStrings"

const validationSchema = Yup.object().shape({
  title: Yup.string().max(50, 'Title is too long').required('Title is required'),
  repo_url: Yup.string().url('Invalid url')
})

function CreateImplementationModal({ show, onClose, }) {

  const isLoading = useSelector(selectLoading)
  const { ideaId } = useParams()

  const dispatch = useDispatch()
  const history = useHistory()

  async function handleSubmit(values) {

    const data = {
      ...values,
      idea: ideaId
    }

    const result = await dispatch(postImplementationAsync(data))

    if (result.status === 201) {
      onClose()
      history.push(routes.IMPLEMENTATION_DETAIL(result.data.id))
      return
    }


  }

  return (
    <Modal
      show={show}
      onCancel={onClose}
      headline="Create Implementation"
      onSubmit={() => null}
    >

      <Formik
        initialValues={{
          title: '',
          repo_url: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >

        <Form>

          <InputField
            label="title"
            name="title"
            type="text"
            labelClassName="block mb-2 w-full"
            className="block w-full text-sm"
            placeholder="Title"
          />

          <InputField
            label="Repo url"
            name="repo_url"
            type="text"
            labelClassName="block mb-2 w-full"
            className="block w-full text-sm"
            placeholder="Enter Github repo url"
          />

          <div className="flex justify-end items-center gap-3" >
            <Button variant="outline-danger" type="button" onClick={onClose} >
              Cancel
            </Button>
            <Button variant="secondary" type="submit" disabled={isLoading} loading={isLoading}   >
              Create
            </Button>
          </div>

        </Form>

      </Formik>

    </Modal>
  )
}

export default CreateImplementationModal
