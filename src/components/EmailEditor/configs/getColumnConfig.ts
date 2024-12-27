import { BlockKeyEnum, IBlockItem } from '../types'
import { blockItemMap } from './blockConfigsList'

const getColumnConfig = (item: IBlockItem) => {
  const config = blockItemMap[BlockKeyEnum.Column]

  if (item) {
    config.children![0].children = [item]
  }

  return config
}

export default getColumnConfig
