import React from 'react'

export const Group = ({title, links}) => {
  return (
    <div>
      <h1>{title}</h1>
      {
        links.map(link => {
          <h3 key={link.url}>{link.url}</h3>
        })
      }
    </div>
  )
}
