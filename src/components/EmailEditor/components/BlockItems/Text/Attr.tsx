import classNames from '../../../utils/classNames'
import { InputNumber, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../../ColorPicker'
import PaddingSettings from '../common/PaddingSettings'
import { IBlockItemProps } from '../../../types'
import { ITextValue } from './type'
import CardItemElement from '../common/CardItemElement'

const fontFamilyList = [
  'sans-serif',
  'Arial',
  '仿宋',
  '黑体',
  'Verdana',
  'Times New Roman',
  'Garamond',
  'Georgia',
  'Courier New',
  'cursive'
]

type TextAttrProps = IBlockItemProps<ITextValue>

const TextAttr = ({ value, styles, onChange, onStylesChange }: TextAttrProps) => {
  const handleStyleChange = (newStyles: any) => {
    onStylesChange({
      ...styles,
      ...newStyles
    })
  }

  const handleColorChange = ({ hex }: any) => {
    handleStyleChange({ color: hex })
  }

  const { color, textAlign, fontFamily, fontSize, lineHeight } = styles

  return (
    <div className="margin-y-30">
      <div className="right-setting-block-item-title">Text Styles</div>
      <CardItemElement title="Font Color">
        <ColorPicker color={color} setColor={handleColorChange} />
      </CardItemElement>
      <CardItemElement title="Text Align">
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
        </div>
      </CardItemElement>
      <CardItemElement title="Font Family">
        <Select className="input-width" value={fontFamily} onChange={(val) => handleStyleChange({ fontFamily: val })}>
          {fontFamilyList.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </CardItemElement>

      <CardItemElement title="Font Size">
        <InputNumber
          min={0}
          className="input-width"
          addonAfter="px"
          value={fontSize}
          onChange={(val) => handleStyleChange({ fontSize: val })}
        />
      </CardItemElement>
      <CardItemElement title="Line Height">
        <InputNumber
          className="input-width"
          addonAfter="%"
          min={0}
          value={Number(lineHeight.replace('%', ''))}
          onChange={(val) => handleStyleChange({ lineHeight: val + '%' })}
        />
      </CardItemElement>
      <div className="right-setting-block-item-title">Padding Settings</div>
      <PaddingSettings padding={styles} setPadding={handleStyleChange} />
    </div>
  )
}

export default TextAttr
