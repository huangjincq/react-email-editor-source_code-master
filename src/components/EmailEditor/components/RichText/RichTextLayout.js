import { useRef, useEffect } from 'react'
import classNames from '../../utils/classNames'
import RichText from '../RichText'

const RichTextLayout = ({ index, value, onChange, styles, isEdit }) => {
  const richTextRef = useRef(null)

  useEffect(() => {
    if (isEdit) {
      richTextRef.current.focus()
    }
  }, [])

  const setTextContent = (event) => {
    onChange(event.target.innerHTML)
  }

  const preventDefault = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className="relative">
      {isEdit && <RichText textBlock={richTextRef} index={index} styles={styles} onChange={onChange} />}
      <div
        className={classNames(isEdit && 'text-block', 'text-content_editable')}
        onClick={preventDefault}
        onInput={setTextContent}
        style={styles}
        contentEditable={isEdit}
        suppressContentEditableWarning
        ref={richTextRef}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  )
}

export default RichTextLayout
