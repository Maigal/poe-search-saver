import React, { useState, useEffect } from 'react'
import { Link } from './Link'
import { getCurrentUrl } from '../navigation'
import { NewLink } from './NewLink'
import iconAdd from '../images/icon-add.svg';


export const Group = ({title, links, renameGroup, addLink, onEditLinkName}) => {

  const [isOpen, setOpen] = useState(true)
  const [isRenaming, setRenaming] = useState(false)
  const [newElement, setNewElement] = useState(null)
  const [canAddElement, setCanAddElement] = useState(true)

  const submitRename = (name) => {
    renameGroup(name)
    setRenaming(false)
  }

  const createLink = (currentUrl) => {
    console.log('curl', currentUrl)
    setNewElement({url: currentUrl, name: ''})
  }

  const onSubmitLink = name => {
    addLink({
      name: name,
      url: newElement.url
    }, title)
    setNewElement(null);
  }

  const validateCurrentUrl = url => {
    if (links.find(el => el.url === url)) {
      setCanAddElement(false)
    } else {
      setCanAddElement(true)
    }
  }

  useEffect(() => {
    getCurrentUrl(validateCurrentUrl)
  }, [links])

  return (
    <div className="group">
      <h3 className="group__header">
        <span className="group__header-title">
        {
          isRenaming 
          ? <input className="group__header-rename-input" defaultValue={title} onBlur={(e) => submitRename(e.target.value)}></input>
          : <span  onDoubleClick={() => setRenaming(true)}>{title}</span>
        }
        </span>
        <span className="group__header-options">
          <span className="group__header-add" disabled={!canAddElement} onClick={() => getCurrentUrl(createLink)}>
            <img className="icon-add" src={iconAdd} alt="Add current url"/>
          </span>
        </span>
      </h3>
      { isOpen && 
        links.map(link => (
          <Link key={link.url} url={link.url} name={link.name} editLinkName={(oldName, newName) => onEditLinkName(oldName, newName, title)}></Link>
        ))
      }
      {
        newElement && 
        <NewLink currentLinks={links} submitLink={(name => onSubmitLink(name))}></NewLink>
      }
    </div>
  )
}
