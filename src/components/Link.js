import React from 'react'

export const Link = ({url, name}) => {

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
