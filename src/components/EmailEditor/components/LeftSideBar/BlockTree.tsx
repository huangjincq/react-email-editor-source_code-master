import { useState, useContext, useMemo, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../reducers'
import { blockConfigsMap } from '../../configs/blockConfigs'
import { Tree } from 'antd'
import { Key } from 'rc-tree/lib/interface'

const BlockTree = () => {
  const { setCurrentItem, currentItem, blockList } = useContext(GlobalContext)

  const [autoExpandParent, setAutoExpandParent] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])

  const treeData = useMemo(() => formatTreeData(blockList), [blockList])
  const selectedKeys = currentItem ? [String(currentItem.index)] : []

  const onSelect = (selectedKeys: Key[], info: any) => {
    // 如果点击的是content节点，则选中父级Column节点
    if (['content', 'empty', 'column'].includes(info.node._key)) {
      const index = Number(info.node.key[0])
      setCurrentItem({ data: blockList[index], type: 'edit', index })
    } else {
      const indexArr = info.node?.key?.split('-')
      const item = blockList[indexArr[0]]?.children?.[indexArr[1]]?.children?.[indexArr[2]]

      setCurrentItem({ data: item, type: 'edit', index: info.node?.key })
    }
  }

  const handleExpand = (expandedKeys: Key[]) => {
    setAutoExpandParent(false)
    setExpandedKeys(expandedKeys)
  }

  useEffect(() => {
    if (currentItem) {
      const stringIndex = String(currentItem.index)
      const indexArr = stringIndex.split('-')
      if (indexArr.length > 1) {
        setAutoExpandParent(true)
        setExpandedKeys((current) => [...current, stringIndex])
      }
    }
  }, [currentItem])

  return (
    <div className="block-tree">
      <div className="block-tree-title">
        <FontAwesomeIcon icon={faLayerGroup} /> Layers
      </div>
      <Tree
        showIcon
        blockNode
        autoExpandParent={autoExpandParent}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={handleExpand}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  )
}

export default BlockTree

const formatTreeData = (treeData: any, parentId = '') => {
  return treeData.map((node: any, index: string) => {
    // 生成新的id，如果是根节点，则不加‘-’前缀
    const id = parentId ? `${parentId}-${index}` : `${index}`

    // 创建新节点对象，避免修改原始节点数据
    const newNode = {
      ...node,
      _key: node.key,
      key: id,
      title: node.name,
      icon: <FontAwesomeIcon icon={blockConfigsMap[node.key].icon} />
    }
    // 如果节点有子节点，则递归调用assignIds函数，并设置新的parentId
    if (node.children && node.children.length > 0) {
      newNode.children = formatTreeData(node.children, id)
    }

    // 返回拥有新id的节点
    return newNode
  })
}
