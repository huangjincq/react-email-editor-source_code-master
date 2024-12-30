import { blockConfigsMap } from '../../configs/blockConfigsList'
import { IBlockItem } from '../../types'

interface BlockItemsProps {
  blockItem: IBlockItem
  index: string
}

const BlockItems = ({ blockItem, index }: BlockItemsProps) => {
  const RenderComponent: any = blockConfigsMap[blockItem.key]?.component
  return RenderComponent ? <RenderComponent value={blockItem.propValue} styles={blockItem.styles} /> : null
}

export default BlockItems
