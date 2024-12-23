import { useState, useContext, useEffect } from 'react'
import { Tooltip, Button, Space } from 'antd'
// import { deepClone } from "../../utils/helpers";
import { GlobalContext } from '../../reducers'
import { deepClone } from '../../utils/helpers'
import { ClearOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'

const Header = () => {
  const { bodySettings, blockList, actionType, setBlockList, setBodySettings } = useContext(GlobalContext)
  const [blockListHistory, setBlockListHistory] = useState({
    histories: [],
    index: 0
  })
  const { histories, index } = blockListHistory

  const handleClearAll = () => {
    setBlockList([], 'delete')
  }

  useEffect(() => {
    //第一次渲染不添加
    const newBlockList = deepClone(blockList)
    const newBodySettings = deepClone(bodySettings)
    if (actionType === 'firstRender') {
      setBlockListHistory({
        histories: [
          {
            blockList: newBlockList,
            bodySettings: newBodySettings
          }
        ],
        index: 0
      })
    } else if (!actionType.includes('set_history')) {
      let newHistories = deepClone(histories)

      newHistories = newHistories.slice(0, index + 1)
      newHistories.push({
        blockList: newBlockList,
        bodySettings: newBodySettings
      })

      setBlockListHistory({
        histories: newHistories,
        index: index + 1
      })
    }
  }, [blockList, bodySettings])

  const prevHistory = () => {
    if (histories[index - 1]) {
      const newHistories = deepClone(histories[index - 1])
      setBlockListHistory({ ...blockListHistory, index: index - 1 })
      setBlockList(newHistories.blockList, `set_history_${index - 1}`)
      setBodySettings(newHistories.bodySettings)
    }
  }

  const nextHistory = () => {
    if (histories[index + 1]) {
      const newHistories = deepClone(histories[index + 1])
      setBlockListHistory({ ...blockListHistory, index: index + 1 })
      setBlockList(newHistories.blockList, `set_history_${index + 1}`)
      setBodySettings(newHistories.bodySettings)
    }
  }

  return (
    <>
      <div className="header">
        <div className="header-box"></div>
        <div className="header-box text-center"></div>
        <div className="header-box text-right">
          <Space>
            <Tooltip title="Clear All">
              <Button
                onClick={handleClearAll}
                disabled={blockList.length === 0}
                shape="circle"
                icon={<ClearOutlined />}
              />
            </Tooltip>
            <Tooltip title="Undo">
              <Button onClick={prevHistory} shape="circle" icon={<UndoOutlined />} disabled={!histories[index - 1]} />
            </Tooltip>
            <Tooltip title="Redo">
              <Button onClick={nextHistory} shape="circle" icon={<RedoOutlined />} disabled={!histories[index + 1]} />
            </Tooltip>
          </Space>
        </div>
      </div>
    </>
  )
}

export default Header
