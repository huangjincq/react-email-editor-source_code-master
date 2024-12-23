import { useContext } from 'react'
import { GlobalContext } from '../../reducers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const ImageBlock = ({ blockItem }) => {
  const { src, alt } = blockItem
  const styles = blockItem.styles.desktop
  const contentStyles = blockItem.contentStyles?.desktop

  return (
    <div className="relative">
      <div style={{ ...contentStyles }}>
        {src ? (
          <img src={src} style={styles} alt={alt} className="inline-block" />
        ) : (
          <div className="empty-image" style={{ ...styles, width: styles.width === 'auto' ? '100%' : styles.width }}>
            <FontAwesomeIcon icon={faImage} className="empty-image-icon" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageBlock
