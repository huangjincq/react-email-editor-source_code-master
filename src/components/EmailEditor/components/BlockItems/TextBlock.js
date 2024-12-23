import { useContext } from 'react'
import { GlobalContext } from '../../reducers'
import RichTextLayout from '../RichText/RichTextLayout'
import { useMemo } from 'react'

const TextBlock = (props) => {
  const { index, blockItem } = props
  const { currentItem, actionType } = useContext(GlobalContext)
  const styles = blockItem.styles
  const isEdit = currentItem && currentItem.index === index
  const richTextElement = useMemo(() => <RichTextLayout {...props} />, [isEdit, actionType])

  return isEdit ? (
    richTextElement
  ) : (
    <div style={{ ...styles }} dangerouslySetInnerHTML={{ __html: blockItem.text }}></div>
  )
}

export default TextBlock
