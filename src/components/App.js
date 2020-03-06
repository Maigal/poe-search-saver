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
          storage.initialize('config', (configInfo) => setConfig(configInfo))
        }
      })
  }

  const addGroup = () => {
    let groupname;
    let ind = data.length;
    do {
      groupname = 'Group ' + ind;
    } while (data.find(el => el.name === groupname))

    const newGroup  = {
      title: groupname,
      links: []
    }

    saveKey('groups', [...data, newGroup])
  }

  const renameGroup = (oldTitle, newTitle) => {
    console.log(oldTitle, newTitle, data)
    if (oldTitle !== newTitle && !data.find(el => el.title.toUpperCase() === newTitle.toUpperCase())) {
      const newData = data.map(el => {
        if (el.title === oldTitle) {
          return {...el, title: newTitle}
        }
        return el
      })
  
      saveKey('groups', newData)
    } else {
      console.warn('Titles must change')
    }
    
  }

  const addLink = (linkData, groupName) => {
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
  }

  const editLink = (oldLinkName, newLinkName, groupName) => {
    const newData = data.map(gr => {
      if (gr.title === groupName) {
        const gLinks = gr.links.map(lnk => {
          if (lnk.name === oldLinkName) {
            return {
              ...lnk,
              name: newLinkName
            }
          }
          return lnk
        })
        return {
          ...gr,
          links: gLinks
        }
      }
      return gr
    })

    saveKey('groups', newData)
  }

  chrome.storage.local.onChanged.addListener(function({groups, config}) {
    if (groups && groups.newValue) {
      setData(groups.newValue)
    }
    if (config && config.newValue) {
      setConfig(config.newValue)
    }
    
  });

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
              onEditLinkName={(oldLinkName, newLinkName, groupName) => editLink(oldLinkName, newLinkName, groupName)}
            />
          )
        })
      }
      <div className="group-adder">
        <div className="group-adder__trigger" onClick={() => addGroup()}>
          Add group
        </div>
      </div>
    </>
  )
}

export default App;