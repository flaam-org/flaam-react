import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import CreateEditDiscussionModal from '../../modals/CreateEditDiscussionModal'
import Button from '../../utilComponents/Button'
import DiscussionsContainer from './DiscussionsContainer'
import DiscussionCommentsContainer from "./DiscussionCommentsContainer"
import { useParams } from 'react-router'

function IdeaDiscussionsPanel() {

  const [currentDiscussion, setCurrentDiscussion] = useState(null)
  const { ideaId } = useParams()



  return (
    <Tab.Panel>
      {currentDiscussion ? (
        <DiscussionCommentsContainer discussionId={currentDiscussion} onBack={() => setCurrentDiscussion(null)} />
      ) : (
        <DiscussionsContainer ideaId={ideaId} onDiscussionSelect={(discussionId) => setCurrentDiscussion(discussionId)} />
      )}

    </Tab.Panel>
  )
}


export default IdeaDiscussionsPanel
