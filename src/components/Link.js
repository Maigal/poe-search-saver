import React, { useState } from 'react'

export const Link = ({url, name}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(name)

  const renameLink = () => {
    console.log('new name', title)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <>
        <input type="text" value={title} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => renameLink} >Submit</button>
      </>
    )
  }

  return (
    <div 
      className="link" 
      key={url} 
      onClick={() => chrome.tabs.create({url: url, active: true})}
    >
      {name}
    </div>
  )
}
