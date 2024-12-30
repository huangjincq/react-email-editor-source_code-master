import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ColorPicker from '../ColorPicker'
import { GlobalContext } from '../../reducers'
import { InputNumber, Input } from 'antd'
import useLayout from '../../utils/useStyleLayout'
import useTranslation from '../../translation'
import AttrComponent from '../BlockItems/AttrComponent'
import { blockConfigsMap } from '../../configs/blockConfigs'
import CardItemElement from '../CardItemElement/index'

const RightSetting = () => {
  const { currentItem, isDragStart, bodySettings, setBodySettings } = useContext(GlobalContext)
  const { t } = useTranslation()

  const blockTitle = blockConfigsMap[currentItem?.data.key]?.name

  const colorChange = (key: string) => (color: any) => {
    setBodySettings({ ...bodySettings, styles: { ...bodySettings.styles, [key]: color.hex } }, 'set_body_settings')
  }

  const themeElement = () => {
    return (
      <>
        <div className="subject-settings">Theme Settings</div>
        <div className="margin-top-32">
          <CardItemElement title="Text Color">
            <ColorPicker color={bodySettings.styles.color} setColor={colorChange('color')} />
          </CardItemElement>
          <CardItemElement title="Theme Background Color">
            <ColorPicker color={bodySettings.styles.backgroundColor} setColor={colorChange('backgroundColor')} />
          </CardItemElement>
          <CardItemElement title="Line Height">
            <InputNumber
              className="input-width"
              addonAfter="px"
              min={0}
              max={900}
              value={Number(bodySettings.contentWidth)}
              onChange={(value) => setBodySettings({ ...bodySettings, contentWidth: value }, 'set_body_settings')}
            />{' '}
          </CardItemElement>
          <div>
            <div className="pre_header">{t('pre_header')}</div>
            <Input
              className="margin-top-12"
              value={bodySettings.preHeader}
              onChange={(event) =>
                setBodySettings({ ...bodySettings, preHeader: event.target.value }, 'set_body_settings')
              }
            />
            <div className="pre_header-desc">{t('pre_header_description')}</div>
          </div>
        </div>
      </>
    )
  }

  const stopPropagation = (event: any) => {
    event.stopPropagation()
  }

  return (
    <div className="right-settings default-scrollbar" onClick={stopPropagation}>
      <AnimatePresence mode="wait">
        {!isDragStart && currentItem && currentItem.type === 'edit' ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            key={0}
          >
            <h2 className="right-setting-block-title">{blockTitle}</h2>
            <div className="margin-top-18">
              <AttrComponent />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            key={1}
          >
            {themeElement()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RightSetting
