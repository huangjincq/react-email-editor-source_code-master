import classNames from '../../../utils/classNames'
import { Switch, Slider, Input, InputNumber, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { IBlockItemProps } from '../../../types'
import PaddingSettings from '../../StyleSettings/PaddingSettings'
import CardItemElement from '../../CardItemElement'
import ColorPicker from '../../ColorPicker'

const dividerType = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Dashed', value: 'dashed' }
]
interface DividerAttrProps extends IBlockItemProps<undefined> {}
const DividerAttr = ({ value, styles, onStylesChange }: DividerAttrProps) => {
  const { textAlign, width, borderTopColor, borderTopWidth, borderTopStyle } = styles

  const handleStyleChange = (newStyles: any) => {
    onStylesChange({
      ...styles,
      ...newStyles
    })
  }
  console.log(22, width, Number(width.replace('%', '')))

  return (
    <div className="margin-y-30">
      <div className="right-setting-block-item-title">Divider Styles</div>
      <CardItemElement title="Divider Type">
        <Select
          className="input-width"
          value={borderTopStyle}
          onChange={(val) => handleStyleChange({ borderTopStyle: val })}
          options={dividerType}
        />
      </CardItemElement>
      <CardItemElement title="Height">
        <InputNumber
          min={0}
          className="input-width"
          addonAfter="px"
          value={borderTopWidth}
          onChange={(val) => handleStyleChange({ borderTopWidth: val })}
        />
      </CardItemElement>
      <CardItemElement title="Divider Color">
        <ColorPicker color={borderTopColor} setColor={({ hex }: any) => handleStyleChange({ borderTopColor: hex })} />
      </CardItemElement>
      <div className="card-item-title">Width</div>
      <Slider value={Number(width.replace('%', ''))} onChange={(val) => handleStyleChange({ width: val + '%' })} />
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
                  textAlign === value ? 'align-style-item-active' : 'align-style-item-un_active',
                  'align-style-item'
                )}
                onClick={() => handleStyleChange({ textAlign: value })}
              >
                <FontAwesomeIcon icon={icon} className="tag-style-size" />
              </div>
            )
          })}
        </div>{' '}
      </CardItemElement>
      <div className="card-item-title">Padding Settings</div>
      <PaddingSettings padding={styles} setPadding={handleStyleChange} />
    </div>
  )
}

export default DividerAttr
