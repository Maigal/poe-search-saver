import React, { useState } from 'react'

export const Link = ({url, name, editLinkName}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(name)

  const renameLink = () => {
    console.log('new name', title)
    editLinkName(name, title)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="link-form">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={() => renameLink()} >Submit</button>
      </div>
    )
  }

  return (
    <div 
      className="link" 
      key={url} 
    >
      <div className="link__title" onClick={() => chrome.tabs.create({url: url, active: true})}>{name}</div>
      <div className="link__actions">
        <button onClick={() => setIsEditing(true)}>E</button>
        <button>X</button>
      </div>
      
    </div>
  )
}
