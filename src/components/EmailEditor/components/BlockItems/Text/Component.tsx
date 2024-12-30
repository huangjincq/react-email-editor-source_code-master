import { IBlockItemProps } from '../../../types'
import { ITextValue } from './type'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '../../../reducers'
import RichTextLayout from '../../RichText/RichTextLayout'

interface TextComponentProps extends IBlockItemProps<ITextValue> {}
const TextComponent = ({ value = '', onChange, onStylesChange, styles, index }: TextComponentProps) => {
  const { currentItem } = useContext(GlobalContext)
  const isEdit = currentItem && currentItem.index === index

  const richTextElement = useMemo(
    () => <RichTextLayout isEdit={isEdit} value={value} onChange={onChange} styles={styles} index={index} />,
    [isEdit, styles]
  )

  return isEdit ? richTextElement : <div style={styles} dangerouslySetInnerHTML={{ __html: value }}></div>
}

export default TextComponent
