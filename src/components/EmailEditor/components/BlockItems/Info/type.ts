export interface IInfoDataSource {
  displayName: string
  fieldId: string
}
export interface IInfoValue {
  dataSourceKey?: string
  dataSource: IInfoDataSource[]
  labelSpan: number
}
