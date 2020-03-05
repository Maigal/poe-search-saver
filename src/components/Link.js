import React, { useState } from 'react'
import iconEdit from '../images/icon-edit.svg';
import iconTrash from '../images/icon-trash.svg';
import iconTick from '../images/icon-tick.svg';

export const Link = ({url, name, editLinkName}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(name)

  const renameLink = () => {
    editLinkName(name, title)
    setIsEditing(false)
  }

  const checkFormSubmission = (e) => {
    if (e.key === 'Enter') {
      renameLink()
    }
  }

  if (isEditing) {
    return (
      <div className="link-form">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyPress={e => checkFormSubmission(e)} />
        <button className="btn-edit" onClick={() => renameLink()} >
          <img src={iconTick} alt=""/>
        </button>
      </div>
    )
  }

  return (
    <div 
      className="link" 
      key={url} 
    >
      <div title={url} className="link__title" onClick={() => chrome.tabs.create({url: url, active: true})}>{name}</div>
      <div className="link__actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          <img src={iconEdit} alt="Edit element"/>
        </button>
        <button className="btn-danger">
          <img src={iconTrash} alt="Delete element"/>
        </button>
      </div>
      
    </div>
  )
}
