import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsEditMode } from '../../../slices/userSlice'
import Tag from "../../utilComponents/Tag"
import AsyncSelect from '../../formComponents/AsyncSelect'
import Button from '../../utilComponents/Button'

function FavouriteTags({ activeTags, setActiveTags }) {

  const isEditMode = useSelector(selectIsEditMode)


  function handleSubmit(tag) {

    console.table(tag)

    setActiveTags(prev => ([...prev, { ...tag, active: true }]))

  }

  function handleFilter(results) {

    const activeTagsSet = new Set(activeTags.map(t => t.id))

    return results.filter(result => !activeTagsSet.has(result.id))

  }

  return (
    <div>
      <div className="flex justify-between px-3">
        <h2>Favourite Tags</h2>
        <Button variant="outline-primary" type="button" className="text-sm" > Create new </Button>
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

        {isEditMode && <AsyncSelect onSubmit={handleSubmit} resultFilter={handleFilter} disabled={!isEditMode} />}

      </div>
    </div>
  )
}

export default FavouriteTags
