import classNames from '../../../utils/classNames'
import { Switch, Slider, Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { IBlockItemProps } from '../../../types'
import { IImageValue } from './type'
import PaddingSettings from '../../StyleSettings/PaddingSettings'
import CardItemElement from '../../CardItemElement'

interface ImageAttrProps extends IBlockItemProps<IImageValue> {}

const ImageAttr = ({ value, styles, onChange, onStylesChange }: ImageAttrProps) => {
  const handleStyleChange = (newStyles: any) => {
    onStylesChange({
      ...styles,
      ...newStyles
    })
  }

  return (
    <div className="margin-y-30">
      <div className="right-setting-block-item-title">Image Settings</div>
      <div className="card-item">
        <div className="width-full">
          <div className="card-item-title">Image URL</div>
          <div className="margin-top-6">
            <Input value={value} onChange={(e) => onChange(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="right-setting-block-item-title">Image Styles</div>
      <CardItemElement title="Width Auto">
        <Switch
          checked={styles.width === 'auto'}
          className={classNames(styles.width === 'auto' ? 'bg-sky-500' : 'bg-gray-400')}
          onChange={() => {
            const value = styles.width === 'auto' ? '100%' : 'auto'
            handleStyleChange({ width: value })
          }}
        />
      </CardItemElement>
      {styles.width !== 'auto' && (
        <Slider
          value={Number(styles.width.replace('%', ''))}
          onChange={(value) => handleStyleChange({ width: value + '%' })}
        />
      )}

      <CardItemElement title="Align">
        <div className="flex justify-center items-center">
          {[
            { icon: faAlignLeft, value: 'left' },
            { icon: faAlignCenter, value: 'center' },
            { icon: faAlignRight, value: 'right' },
            { icon: faAlignJustify, value: 'justify' }
          ].map(({ icon, value }) => {
            return (
              <div
                key={value}
                className={classNames(
                  styles.textAlign === value ? 'align-style-item-active' : 'align-style-item-un_active',
                  'align-style-item'
                )}
                onClick={() => handleStyleChange({ textAlign: value })}
              >
                <FontAwesomeIcon icon={icon} className="tag-style-size" />
              </div>
            )
          })}
        </div>
      </CardItemElement>
      <div className="card-item-title">Padding Settings</div>
      <PaddingSettings padding={styles} setPadding={handleStyleChange} />
    </div>
  )
}

export default ImageAttr
