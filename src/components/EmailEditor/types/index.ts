export interface IBlockItemStyles {
  [key: string]: any
}

export enum BlockKeyEnum {
  Column = 'column',
  Content = 'content',
  Empty = 'empty',
  Text = 'text',
  Image = 'image',
  Info = 'info'
}

export interface IBlockItem {
  name: string
  key: BlockKeyEnum
  styles: IBlockItemStyles
  propValue?: any // 组件的值
  children?: IBlockItem[]
}

export interface IBlockItemMap {
  [key: string]: IBlockItem
}

export interface IBlockConfigItem extends IBlockItem {
  icon: any
  component?: (props: IBlockItemProps<any>) => JSX.Element // 渲染哪个组件
  attrComponent?: (props: IBlockItemProps<any>) => JSX.Element // 渲染 哪个属性面板组件
  children?: IBlockConfigItem[]
}

export interface IBlockConfigsMap {
  [key: string]: IBlockConfigItem
}

export interface IBlockItemProps<T> {
  value?: T
  index: string
  onChange: (value: T) => void
  styles: IBlockItemStyles
  onStylesChange: (styles: IBlockItemStyles) => void
}
