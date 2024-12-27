export interface IBlockItemStyles {
  [key: string]: any
}

export enum BlockKeyEnum {
  Column = 'column',
  Content = 'content',
  Empty = 'empty'
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
  component?: React.ReactNode // 渲染哪个组件
  attrComponent?: React.ReactNode // 渲染 哪个属性面板组件
  children?: IBlockConfigItem[]
}

export interface IBlockConfigsMap {
  [key: string]: IBlockConfigItem
}

export interface IBlockItemProps<T> {
  value: T
  onChange?: (value: T) => void
  styles: IBlockItemStyles
  onStylesChange?: (styles: IBlockItemStyles) => void
}
