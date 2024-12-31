import { faColumns, faFont, faGripLines, faImage, faBorderNone, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { BlockKeyEnum, IBlockConfigItem, IBlockConfigsMap } from '../types'
import { IInfoValue } from '../components/BlockItems/Info/type'
import InfoComponent from '../components/BlockItems/Info/Component'
import InfoAttr from '../components/BlockItems/Info/Attr'
import ColumnAttr from '../components/BlockItems/Column/Attr'
import TextComponent from '../components/BlockItems/Text/Component'
import TextAttr from '../components/BlockItems/Text/Attr'
import ImageComponent from '../components/BlockItems/Image/Component'
import ImageAttr from '../components/BlockItems/Image/Attr'
import DividerComponent from '../components/BlockItems/Divider/Component'
import DividerAttr from '../components/BlockItems/Divider/Attr'

const blockConfigsList: IBlockConfigItem[] = [
  {
    name: 'Column',
    key: BlockKeyEnum.Column,
    propValue: 'full',
    icon: faColumns,
    attrComponent: ColumnAttr,
    styles: {
      backgroundColor: 'transparent',
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      contentBackground: '#fff'
    }
  },
  {
    name: 'Content',
    key: BlockKeyEnum.Content,
    icon: faSquare,
    propValue: '100%',
    hiddenInList: true,
    styles: {
      backgroundColor: 'transparent',
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      contentBackground: 'transparent'
    }
  },
  {
    name: 'Drag block here',
    key: BlockKeyEnum.Empty,
    icon: faBorderNone,
    hiddenInList: true,
    styles: {
      backgroundColor: 'transparent',
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0
    }
  },
  {
    name: 'Text',
    key: BlockKeyEnum.Text,
    icon: faFont,
    propValue: 'This is a text, click to edit text',
    component: TextComponent,
    attrComponent: TextAttr,
    styles: {
      fontSize: 14,
      fontFamily: 'sans-serif',
      color: undefined,
      lineHeight: '140%',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'left'
    }
  },
  {
    name: 'Image',
    key: BlockKeyEnum.Image,
    icon: faImage,
    propValue: '',
    component: ImageComponent,
    attrComponent: ImageAttr,
    styles: {
      width: 'auto',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'center'
    }
  },
  {
    name: 'Divider',
    icon: faGripLines,
    key: BlockKeyEnum.Divider,
    component: DividerComponent,
    attrComponent: DividerAttr,
    styles: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'center',
      width: '100%',
      borderTopStyle: 'solid',
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  {
    name: 'Info',
    key: BlockKeyEnum.Info,
    icon: faNewspaper,
    propValue: {
      dataSource: [],
      labelSpan: 4,
      dataSourceKey: undefined
    } as IInfoValue,
    component: InfoComponent,
    attrComponent: InfoAttr,
    styles: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'center'
    }
  }
]

const getBlockConfigsMap = (tree: IBlockConfigItem[]) => {
  const map: any = {}
  tree.forEach((node) => {
    // 将当前节点的id和name添加到map对象中
    map[node.key] = node
    // 如果当前节点有子节点，则递归调用此函数
  })
  return map
}

export const blockConfigsMap: IBlockConfigsMap = getBlockConfigsMap(blockConfigsList)

export default blockConfigsList
