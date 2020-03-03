import React, { useState } from 'react'
import { Link } from './Link'

export const Group = ({title, links, renameGroup}) => {

  const [isOpen, setOpen] = useState(true)
  const [isRenaming, setRenaming] = useState(false)

  const submitRename = (name) => {
    renameGroup(name)
    setRenaming(false)
  }

  return (
    <div className="group">
      <h3 className="group__header">
        <span>{isOpen ? '-' : '+'}</span>
        <span className="group__header-title">
        {
          isRenaming 
          ? <input className="group__header-rename-input" defaultValue={title} onBlur={(e) => submitRename(e.target.value)}></input>
          : <span  onDoubleClick={() => setRenaming(true)}>{title}</span>
        }
        </span>
        <span className="group__header-options">
          <button>Copy</button>
          <button>Add</button>
        </span>
      </h3>
      { isOpen && 
        links.map(link => (
          <Link key={link.url} url={link.url} name={link.name}></Link>
        ))
      }
      <div className="group__quick-add">
        +
      </div>
    </div>
  )
}
