import React from 'react'
import { useParams } from "react-router-dom"

function IdeaDetail() {

  const { ideaId } = useParams()

  return (
    <div>
      this is idea detail{ideaId}
    </div>
  )
}

export default IdeaDetail
