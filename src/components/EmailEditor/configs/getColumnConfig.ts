import { BlockKeyEnum, IBlockItem } from '../types'
import { blockItemMap } from './blockConfigs'

const getColumnConfig = (item: IBlockItem) => {
  const config = blockItemMap[BlockKeyEnum.Column]

  if (item && config.children) {
    config.children[0].children = [item]
  }

  return config
}

export default getColumnConfig
