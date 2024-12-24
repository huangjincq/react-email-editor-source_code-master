import {
  faColumns,
  faMinusSquare,
  faHeading,
  faFont,
  faGripLines,
  faImage,
  faBorderNone,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

const blockConfigsList = [
  {
    name: 'Column',
    key: 'column',
    type: 'full',
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
        key: 'content',
        icon: faSquare,
        width: '100%',
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
            key: 'empty',
            icon: faBorderNone,
            width: '100%',
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
  },
  {
    name: 'Text',
    key: 'text',
    icon: faFont,
    text: 'This is a text, click to edit text',
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
    name: 'Heading',
    key: 'heading',
    icon: faHeading,
    text: 'This is a heading, click to edit heading',
    type: 'h1',
    styles: {
      fontSize: 22,
      lineHeight: '140%',
      fontFamily: 'sans-serif',
      color: undefined,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'left',
      fontWeight: 'bold'
    }
  },
  {
    name: 'Button',
    key: 'button',
    icon: faMinusSquare,
    text: 'Button',
    type: 'link',
    linkURL: '',
    contentStyles: {
      textAlign: 'center',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12
    },
    styles: {
      width: 'auto',
      fontSize: 12,
      lineHeight: '140%',
      borderRadius: 4,
      fontFamily: 'sans-serif',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#2faade',
      color: '#fff',
      display: 'inline-block'
    }
  },
  {
    name: 'Divider',
    icon: faGripLines,
    key: 'divider',
    contentStyles: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'center'
    },
    styles: {
      width: '100%',
      borderTopStyle: 'solid',
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  {
    name: 'Image',
    key: 'image',
    icon: faImage,
    src: '',
    alt: 'Image',
    type: 'link',
    linkURL: '',
    contentStyles: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      textAlign: 'center'
    },
    styles: {
      width: 'auto'
    }
  }
]

const getBlockConfigIconsMap = (tree, map = {}) => {
  tree.forEach((node) => {
    // 将当前节点的id和name添加到map对象中
    map[node.key] = node.icon
    // 如果当前节点有子节点，则递归调用此函数
    if (node.children && node.children.length > 0) {
      getBlockConfigIconsMap(node.children, map)
    }
  })
  return map
}

export const blockConfigIconsMap = getBlockConfigIconsMap(blockConfigsList, {})

export default blockConfigsList
