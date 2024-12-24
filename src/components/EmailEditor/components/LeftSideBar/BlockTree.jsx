import { useState, useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../reducers'
import { blockConfigIconsMap } from '../../configs/blockConfigsList'
import { Tree } from 'antd'

const BlockTree = (props) => {
  const { setCurrentItem, setIsDragStart, blockList, setActionType } = useContext(GlobalContext)

  const treeData = useMemo(() => {
    return formatTreeData(blockList)
  }, [blockList])

  return (
    <div className="block-tree">
      <div className="block-tree-title">
        <FontAwesomeIcon icon={faLayerGroup} /> Layers
      </div>
      <Tree
        showIcon
        // onSelect={onSelect}
        // onCheck={onCheck}
        treeData={treeData}
      />
    </div>
  )
}

export default BlockTree

const formatTreeData = (treeData, parentId = '') => {
  return treeData.map((node, index) => {
    // 生成新的id，如果是根节点，则不加‘-’前缀
    const id = parentId ? `${parentId}-${index}` : `${index}`

    // 创建新节点对象，避免修改原始节点数据
    const newNode = {
      ...node,
      _key: node.key,
      key: id,
      title: node.name,
      icon: <FontAwesomeIcon icon={blockConfigIconsMap[node.key]} />
    }

    // 如果节点有子节点，则递归调用assignIds函数，并设置新的parentId
    if (node.children && node.children.length > 0) {
      newNode.children = formatTreeData(node.children, id)
    }

    // 返回拥有新id的节点
    return newNode
  })
}
