export interface IBlockItem {
  name: string
  key: string
  styles: {
    [key: string]: any
  }
  type?: string
  width?: string
  children?: IBlockItem[]
}
