import {
  faColumns,
  faMinusSquare,
  faHeading,
  faFont,
  faGripLines,
  faImage,
  faBorderNone,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { BlockKeyEnum, IBlockConfigItem, IBlockConfigsMap, IBlockItemMap } from '../types'

const blockConfigsList: IBlockConfigItem[] = [
  {
    name: 'Column',
    key: BlockKeyEnum.Column,
    propValue: 'full',
    icon: faColumns,
    styles: {
      backgroundColor: 'transparent',
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      contentBackground: '#fff'
    },
    children: [
      {
        name: 'Content',
        key: BlockKeyEnum.Content,
        icon: faSquare,
        propValue: '100%',
        styles: {
          backgroundColor: 'transparent',
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          contentBackground: 'transparent'
        },
        children: [
          {
            name: 'Drag block here',
            key: BlockKeyEnum.Empty,
            icon: faBorderNone,
            styles: {
              backgroundColor: 'transparent',
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0
            }
          }
        ]
      }
    ]
  }
]

const getBlockConfigsMap = (tree: IBlockConfigItem[], map = {} as any) => {
  tree.forEach((node) => {
    // 将当前节点的id和name添加到map对象中
    map[node.key] = node
    // 如果当前节点有子节点，则递归调用此函数
    if (node.children && node.children.length > 0) {
      getBlockConfigsMap(node.children, map)
    }
  })
  return map
}

const getBlockItemMap = (tree: IBlockConfigItem[], map = {} as any) => {
  tree.forEach(({ icon, ...node }) => {
    // 将当前节点的id和name添加到map对象中
    map[node.key] = node
    // 如果当前节点有子节点，则递归调用此函数
    if (node.children && node.children.length > 0) {
      getBlockItemMap(node.children, map)
    }
  })
  return map
}

export const blockConfigsMap: IBlockConfigsMap = getBlockConfigsMap(blockConfigsList, {})
export const blockItemMap: IBlockItemMap = getBlockItemMap(blockConfigsList, {})

export default blockConfigsList
