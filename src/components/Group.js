import React, { useState } from 'react'

export const Group = ({title, links}) => {

  const [isOpen, setOpen] = useState(true)

  return (
    <div className="group">
      <h3 className="group__title">
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </h3>
      { isOpen && 
        links.map(link => (
          <div className="link" key={link.url}>{link.url}</div>
        ))
      }
      <div className="group__quick-add">
        +
      </div>
    </div>
  )
}
