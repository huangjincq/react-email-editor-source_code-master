import { useContext } from 'react'
import { GlobalContext } from '../../reducers'

const DividerBlock = ({ blockItem }) => {
  const styles = blockItem.styles
  const contentStyles = blockItem.contentStyles

  return (
    <div className="relative">
      <div style={{ ...contentStyles }}>
        <div style={{ ...styles }}></div>
      </div>
    </div>
  )
}

export default DividerBlock
