import { cloneDeep } from 'lodash-es'
import { blockConfigsMap } from '../../configs/blockConfigs'
import { IBlockItem } from '../../types'
import { useContext } from 'react'
import { GlobalContext } from '../../reducers'

interface BlockItemsProps {
  blockItem: IBlockItem
  index: string
}

const BlockItems = ({ blockItem, index }: BlockItemsProps) => {
  const { currentItem, blockList, setBlockList, setCurrentItem } = useContext(GlobalContext)

  const RenderComponent: any = blockConfigsMap[blockItem.key]?.component

  const _currentItemChange = (newCurrentItem: any) => {
    const newBlockList = cloneDeep(blockList)

    const indexArr = newCurrentItem.index.split('-')
    newBlockList[indexArr[0]].children[indexArr[1]].children[indexArr[2]] = newCurrentItem.data

    setBlockList(newBlockList, `edit_${new Date().getTime()}`)
    setCurrentItem(newCurrentItem)
  }

  const handlePropValueChange = (propValue: any) => {
    const newCurrentItem = cloneDeep(currentItem)
    newCurrentItem.data.propValue = propValue

    _currentItemChange(newCurrentItem)
  }

  const handleStylesChange = (styles: any) => {
    const newCurrentItem = cloneDeep(currentItem)
    newCurrentItem.data.styles = styles

    _currentItemChange(newCurrentItem)
  }

  return RenderComponent ? (
    <RenderComponent
      index={index}
      value={blockItem.propValue}
      styles={blockItem.styles}
      onChange={handlePropValueChange}
      onStylesChange={handleStylesChange}
    />
  ) : (
    <>{blockItem.key} 组件未引入</>
  )
}

export default BlockItems
