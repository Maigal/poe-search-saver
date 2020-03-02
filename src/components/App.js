import React, { useState, useEffect } from 'react'
import { storage } from '../storage';
import { Group } from './Group';


 const App = () => {

  const [data, setData] = useState([])
  const [config, setConfig] = useState({})

  const fetchKey = async (key) => {
    const res = await storage.getData(key)
      .then(res => res)

    return res
  }

  const loadGroups = () => {
    fetchKey('groups')
      .then(res => setData(res))
  }

  const loadConfig = () => {
    fetchKey('config')
      .then(res => setConfig(res))
  }


  const initialize = async () => {
    const dataGroups = await storage.getData('groups').then(res => {
        if (res) {
          setData(res)
        } else {
          storage.initialize('groups', (groupsInfo) => setData(groupsInfo))
        }
      })

    const dataConfig = await storage.getData('config').then(res => {
        if (res) {
          setConfig(res)
        } else {
          storage.initialize('config', (configInfo) => setData(configInfo))
        }
      })
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <>
      <header className="header">options</header>
      {
        data.map(gr => {
          return (
            <Group key={gr.title} title={gr.title} links={gr.links} />
          )
        })
      }
    </>
  )
}

export default App;