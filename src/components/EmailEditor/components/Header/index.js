import { GlobalContext } from '../../reducers'
import { Fragment, useContext, useEffect } from 'react'
import dataToHtml from '../../utils/dataToHTML'
import { Button } from 'antd'

const Header = (props) => {
  const { blockList, bodySettings } = useContext(GlobalContext)

  const exportHTML = () => {
    const html = dataToHtml({ bodySettings: bodySettings, blockList: blockList })
    const blob = new Blob([html], { type: 'text/html' })
    const a = document.createElement('a')
    a.download = 'email.html'
    a.href = URL.createObjectURL(blob)
    a.click()
  }

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-title">Statement Editor</div>
      <div className="dashboard-header-feature">
        <Button type="primary" onClick={exportHTML}>
          View Json
        </Button>
        <Button type="primary" onClick={exportHTML}>
          View Html
        </Button>
        <Button type="primary" onClick={exportHTML}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default Header
