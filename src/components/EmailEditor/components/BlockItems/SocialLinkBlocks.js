import { useContext } from 'react'
import { GlobalContext } from '../../reducers'

const SocialLinkBlocks = ({ blockItem }) => {
  const { list, imageWidth } = blockItem
  const styles = blockItem.styles.desktop
  const contentStyles = blockItem.contentStyles?.desktop
  return (
    <div className="relative">
      <div style={contentStyles}>
        {list.map((socialLinkItem, index) => {
          const { image, title } = socialLinkItem
          return (
            <div key={index} style={{ ...styles, display: 'inline-block' }}>
              <img src={image} alt={title} style={{ width: imageWidth }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SocialLinkBlocks
