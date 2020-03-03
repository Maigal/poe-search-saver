import React, { useState } from 'react'

export const NewLink = ({currentLinks, submitLink}) => {

  const [name, setName] = useState('')

  return (
    <>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <button onClick={() => submitLink(name)} disabled={currentLinks.find(el => el.name === name)}>Submit</button>
    </>
  )
}
