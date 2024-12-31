import { omit } from 'lodash-es'
import { BlockKeyEnum, IBlockConfigItem, IBlockItem } from '../types'
import { blockConfigsMap } from './blockConfigs'

// 特殊情况，页面第一次添加元素
export const getEmptyColumnConfig = (item?: IBlockItem) => {
  const config: any = getColumnConfig(BlockKeyEnum.Column)
  if (item && config.children[0]) {
    config.children[0].children = [item]
  }

  return config
}

const omitFields = ['attrComponent', 'icon', 'component']
export const getColumnConfig = (key: BlockKeyEnum) => {
  if (key === BlockKeyEnum.Column) {
    return {
      ...omit(blockConfigsMap[BlockKeyEnum.Column], omitFields),
      children: [
        {
          ...omit(blockConfigsMap[BlockKeyEnum.Content], omitFields),
          children: [omit(blockConfigsMap[BlockKeyEnum.Empty], omitFields)]
        }
      ]
    }
  }

  return omit(blockConfigsMap[key], omitFields) // 剔除一些属性
}
