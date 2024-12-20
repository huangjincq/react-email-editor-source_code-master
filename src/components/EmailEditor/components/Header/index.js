import { GlobalContext } from '../../reducers'
import { Fragment, useContext, useEffect, useState } from 'react'
import dataToHtml from '../../utils/dataToHTML'
import { Button, Modal, Row, Space } from 'antd'
import { SaveOutlined, DownloadOutlined } from '@ant-design/icons'
import ReactJson from 'react-json-view'
import SyntaxHighlighter from 'react-syntax-highlighter'

const Header = (props) => {
  const [showViewJson, setShowViewJson] = useState(false)
  const [htmlString, setHtmlString] = useState('')

  const { blockList, bodySettings } = useContext(GlobalContext)

  const handleViewHtml = () => {
    const html = dataToHtml({ bodySettings: bodySettings, blockList: blockList })
    setHtmlString(html)
  }

  const exportHTML = () => {
    const blob = new Blob([htmlString], { type: 'text/html' })
    const a = document.createElement('a')
    a.download = 'email.html'
    a.href = URL.createObjectURL(blob)
    a.click()
  }

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-title">Statement Editor</div>
      <div className="dashboard-header-feature">
        <Button onClick={() => setShowViewJson(true)}>View Json</Button>
        <Button onClick={handleViewHtml}>View Html</Button>
        <Button type="primary" onClick={exportHTML} icon={<SaveOutlined />}>
          Save
        </Button>
      </div>
      <Modal
        title="View Json"
        destroyOnClose
        open={showViewJson}
        onCancel={() => setShowViewJson(false)}
        footer={null}
        width="60%"
      >
        <ReactJson
          src={blockList}
          name={false}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
        />
      </Modal>
      <Modal
        title={
          <Space justify="space-between">
            <div>View Html</div>
            <Button onClick={exportHTML} type="primary" icon={<DownloadOutlined />} size="small" />
          </Space>
        }
        destroyOnClose
        open={Boolean(htmlString)}
        onCancel={() => setHtmlString(false)}
        footer={null}
        width="60%"
        zIndex={9999}
      >
        <SyntaxHighlighter language="html">{htmlString}</SyntaxHighlighter>
      </Modal>
    </div>
  )
}

export default Header
