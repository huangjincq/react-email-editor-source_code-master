import { BlockKeyEnum, IBlockItem } from '../types'
import { blockItemMap } from './blockConfigs'
console.log(blockItemMap)

const getColumnConfig = (item: IBlockItem) => {
  // 特殊情况，第一次添加元素
  const config = {
    ...blockItemMap[BlockKeyEnum.Column],
    children: [{ ...blockItemMap[BlockKeyEnum.Content], children: item ? [item] : [blockItemMap[BlockKeyEnum.Empty]] }]
  }

  return config
}

export default getColumnConfig
