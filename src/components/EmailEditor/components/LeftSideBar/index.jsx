import { useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from '../../utils/classNames'
import { faImages, faCubes } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../reducers'
import { deepClone } from '../../utils/helpers'
import blockConfigsList from '../../configs/blockConfigsList'
import BlockTree from './BlockTree'

const LeftSideBar = (props) => {
  const { clearStyles } = props
  const { setCurrentItem, setIsDragStart, blockList, setActionType } = useContext(GlobalContext)
  const [currentSideBarKey, setCurrentSideBarKey] = useState('blocks')

  const sidebarTabsList = [
    {
      name: 'Basic',
      icon: faCubes,
      key: 'blocks'
    },
    {
      name: 'Customize',
      icon: faImages,
      key: 'photos'
    }
  ]

  const dragEnd = (event) => {
    event.target.style.border = ''
    event.target.children[0] && event.target.children[0].classList.remove('sidebar-block-move')
    setTimeout(() => {
      setIsDragStart(false)
      clearStyles()
    }, 50)
  }

  const dragStart = (item) => (event) => {
    setCurrentItem({ data: deepClone(item), type: 'add', index: blockList.length + 1 })
    setIsDragStart(true)
    event.target.style.border = '1px dashed #ccc'
    event.target.children[0] && event.target.children[0].classList.add('sidebar-block-move')
    setActionType('add')
  }

  const blocksElement = () => {
    return (
      <motion.div
        className="side-bar-blocks"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        key="blocks"
      >
        <div className="side-bar-blocks-container">
          {blockConfigsList.map((item) => {
            return (
              <div
                className="side-bar-blocks-item"
                data-block_type="header"
                draggable="true"
                key={item.key}
                onDragEnd={dragEnd}
                onDragStart={dragStart(item)}
              >
                <div className="sidebar-block">
                  <FontAwesomeIcon icon={item.icon} className="sidebar-block-icon" />
                  <div className="sidebar-block-text">{item.name}</div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="side-bar">
      <div className="side-bar-top">
        <div className="side-bar-tabs">
          {sidebarTabsList.map((item) => {
            const { key, icon, name } = item
            return (
              <div
                onClick={() => {
                  if (key !== currentSideBarKey) {
                    setCurrentSideBarKey(key)
                  }
                }}
                className={classNames(
                  currentSideBarKey === key ? 'side-bar-tab-item-active' : 'side-bar-tab-item',
                  'side-bar-item-default'
                )}
                key={key}
              >
                <FontAwesomeIcon icon={icon} className="text-18" />
                <div className="side-bar-icon-title">{name}</div>
              </div>
            )
          })}
        </div>
        <div className="side-bar-content">
          <AnimatePresence mode="wait">{currentSideBarKey === 'blocks' && blocksElement()}</AnimatePresence>
        </div>
      </div>
      <BlockTree />
    </div>
  )
}

export default LeftSideBar
