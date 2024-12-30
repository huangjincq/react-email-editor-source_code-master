import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { IBlockItemProps } from '../../../types'
import { IImageValue } from './type'
interface TextComponentProps extends IBlockItemProps<IImageValue> {}

const ImageComponent = ({ value, styles }: TextComponentProps) => {
  const { width, ...wrapperStyles } = styles
  return (
    <div className="relative" style={wrapperStyles}>
      {value ? (
        <img src={value} style={styles} alt={value} className="inline-block" />
      ) : (
        <div className="empty-image" style={{ width: width === 'auto' ? '100%' : width }}>
          <FontAwesomeIcon icon={faImage} className="empty-image-icon" />
        </div>
      )}
    </div>
  )
}

export default ImageComponent
