import React, { useState } from 'react';
import iconTick from '../images/icon-tick.svg';

export const NewLink = ({currentLinks, submitLink}) => {

  const [name, setName] = useState('')

  const checkFormSubmission = (e) => {
    if (e.key === 'Enter') {
      submitLink(name)
    }
  }

  return (
    <div className="link-form">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyPress={e => checkFormSubmission(e)} />
        <button className="btn-edit" onClick={() => submitLink(name)} disabled={currentLinks.find(el => el.name === name)} >
          <img src={iconTick} alt=""/>
        </button>
      </div>
  )
}
