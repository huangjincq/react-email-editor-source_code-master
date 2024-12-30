import { useContext } from 'react'
import { blockConfigsMap } from '../../configs/blockConfigs'
import { GlobalContext } from '../../reducers'
import { cloneDeep } from 'lodash-es'

const AttrComponent = () => {
  const { currentItem, blockList, setBlockList, setCurrentItem } = useContext(GlobalContext)
  const RenderComponent: any = blockConfigsMap[currentItem?.data?.key]?.attrComponent

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
      onChange={handlePropValueChange}
      onStylesChange={handleStylesChange}
      value={currentItem?.data?.propValue}
      styles={currentItem?.data?.styles}
    />
  ) : (
    <>{currentItem?.data?.key} 组件未引入</>
  )
}

export default AttrComponent
