import React, { useState, useEffect } from 'react'
import { Link } from './Link'
import { getCurrentUrl } from '../navigation'
import { NewLink } from './NewLink'
import iconAdd from '../images/icon-add.svg';
import iconCross from '../images/icon-cross.svg';
import iconHamburger from '../images/icon-hamburger.svg';


export const Group = ({title, links, renameGroup, deleteGroup, addLink, onEditLinkName, onLinkDragStart, onDrop}) => {

  const [isOpen, setOpen] = useState(true)
  const [isMenuOpen, setMenuOpen] = useState(false)
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
          <span className="group__header-add" onClick={() => getCurrentUrl(createLink)}>
            {canAddElement && <img className="icon-add" src={iconAdd} alt="Add current url"/>}
          </span>
          <span className={`group__header-menu ${isMenuOpen ? 'expanded' : ''}`}>
          {
            isMenuOpen ?
              <>
              <img className="icon-menu" src={iconCross} alt="Group menu" onClick={() => setMenuOpen(!isMenuOpen)} />
              <div className="header-menu__content">
                <div onClick={() => deleteGroup(title)}>Delete group</div>
              </div>
              </>
            : <img className="icon-menu" src={iconHamburger} alt="Group menu" onClick={() => setMenuOpen(!isMenuOpen)} />
          }
            
          </span>
        </span>
      </h3>
      { isOpen && 
        links.map((link, linkIndex) => (
          <React.Fragment key={link.url + linkIndex}>
            <div key={`${title}-${linkIndex}`} className={linkIndex} onDragOver={e => e.preventDefault()} onDrop={e => onDrop(linkIndex, title)} style={{height: '5px'}} ></div>
            <Link 
              key={link.url} 
              url={link.url} 
              name={link.name} 
              editLinkName={(oldName, newName) => onEditLinkName(oldName, newName, title)}
              onDragStart={(linkUrl, linkName) => onLinkDragStart(linkUrl, linkName, title)}
            />
          </React.Fragment>
        ))
      }
      <div onDragOver={e => e.preventDefault()} onDrop={e => onDrop(links.length, title)} style={{height: '10px'}} ></div>
      {
        newElement && 
        <NewLink currentLinks={links} submitLink={(name => onSubmitLink(name))}></NewLink>
      }
    </div>
  )
}
