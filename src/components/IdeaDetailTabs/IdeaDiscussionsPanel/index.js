import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import CreateEditDiscussionModal from '../../modals/CreateEditDiscussionModal'
import Button from '../../utilComponents/Button'
import DiscussionsContainer from './DiscussionsContainer'
import DiscussionCommentsContainer from "./DiscussionCommentsContainer"

function IdeaDiscussionsPanel() {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { ideaId } = useParams()
  const [currentDiscussion, setCurrentDiscussion] = useState(null)


  return (
    <Tab.Panel>
      <Button variant="outline-primary" onClick={() => setIsCreateModalOpen(true)} >Add Discussion</Button>


      {currentDiscussion ? (
        <DiscussionCommentsContainer discussionId={currentDiscussion} onBack={() => setCurrentDiscussion(null)} />
      ) : (
        <DiscussionsContainer ideaId={ideaId} onDiscussionSelect={(discussionId) => setCurrentDiscussion(discussionId)} />
      )}

      <CreateEditDiscussionModal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} ideaId={ideaId} />
    </Tab.Panel>
  )
}


export default IdeaDiscussionsPanel
