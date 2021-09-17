import React from 'react'
import Tag from "../../utilComponents/Tag"

function FavouriteTags({ activeTags, setActiveTags, isEditMode }) {

  return (
    <div>
      <div className="flex justify-between px-3">
        <h2>Favourite Tags</h2>
        <button type="button" >Create new</button>
      </div>
      <div className="flex flex-wrap">

        {activeTags.map(tag => {

          const onTagClick = () => {
            if (!isEditMode) return;

            setActiveTags(prev => {

              return [...prev].map(t => {
                if (t.id === tag.id) {
                  return { ...tag, active: !t.active }
                }

                return t
              })
            })
          }

          return <Tag key={tag.id} tag={tag} faded={!tag.active} onClick={onTagClick} />
        })}

      </div>
    </div>
  )
}

export default FavouriteTags
