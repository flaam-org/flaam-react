import React from 'react'
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectLoading, selectCurrentIdea } from "../../slices/ideaSlice"

function IdeaDetail() {

  const { ideaId } = useParams()
  const isLoading = useSelector(selectLoading)
  const idea = useSelector(selectCurrentIdea)

  console.log(isLoading);


  return (
    <div>
      {idea && (
        <span>this is idea detail{ideaId}</span>
    )}
    </div>
  )
}

export default IdeaDetail
