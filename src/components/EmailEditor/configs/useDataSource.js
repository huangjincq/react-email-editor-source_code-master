import useTranslation from '../translation'
import getColumnsSettings from './getColumnsSettings'
import getColumnConfigFunc from './getColumnConfigFunc'

const useDataSource = () => {
  const { t } = useTranslation()
  const columnsSetting = getColumnsSettings(t)
  const getColumnConfig = getColumnConfigFunc(t)

  return {
    columnsSetting,
    getColumnConfig
  }
}

export default useDataSource
