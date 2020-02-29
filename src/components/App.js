import React, { useState, useEffect } from 'react'
import { storage } from '../storage';

 const App = () => {

  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await storage.get('groups')
      .then(res => res)
    return res
  }

  const loadData = () => {
    fetchData()
      .then(res => setData(res))
  }

  const addGroup = (title) => {
    const nextState = [
      ...data,
      {
        name: title,
        elements: {}
      }
    ]

    storage.save(nextState)
      .then(loadData())
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <button onClick={() => addGroup('prueboea')}>asd</button>
      <h1>POE Search Saver</h1>
      {
        data.map((el, index) => {
          return (
            <div key={index}>
              {el.name}
            </div>
          )
        })
      }
    </>
  )
}

export default App;