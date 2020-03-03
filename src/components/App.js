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

  const saveKey = async (key, newData) => {
    const res = await storage.saveData(key, newData)
      .then(() => newData)
      .catch(err => err)

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

  const renameGroup = (oldTitle, newTitle) => {
    const newData = data.map(el => {
      if (el.title === oldTitle) {
        return {...el, title: newTitle}
      }
      return el
    })

    saveKey('groups', newData)
      .then(res => {
        setData(res)
      })
  }

  const addLink = (linkData, groupName) => {
    console.log(linkData, groupName)
    const newData = [...data].map(gr => {
      if (gr.title === groupName) {
        return {
          ...gr,
          links: [...gr.links, linkData]
        }
      }
      return gr
    })

    saveKey('groups', newData)
      .then(res => {
        setData(res)
      })
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <>
      <header className="header">POE SEARCH SAVER</header>
      { data && 
        data.map(gr => {
          return (
            <Group 
              key={gr.title} 
              title={gr.title} 
              links={gr.links} 
              renameGroup={(newTitle) => {renameGroup(gr.title, newTitle)}}
              addLink={(linkData, groupName) => addLink(linkData, groupName)}
            />
          )
        })
      }
    </>
  )
}

export default App;