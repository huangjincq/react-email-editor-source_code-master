import TextBlock from './TextBlock'
import HeadingBlock from './HeadingBlock'
import ButtonBlock from './ButtonBlock'
import DividerBlock from './DividerBlock'
import ImageBlock from './ImageBlock'
import Info from './Info'

const BlockItems = ({ blockItem, index }) => {
  return (
    <>
      {blockItem && blockItem.key === 'text' && <TextBlock blockItem={blockItem} index={index} />}
      {blockItem && blockItem.key === 'heading' && <HeadingBlock blockItem={blockItem} index={index} />}
      {blockItem && blockItem.key === 'button' && <ButtonBlock blockItem={blockItem} index={index} />}
      {blockItem && blockItem.key === 'divider' && <DividerBlock blockItem={blockItem} index={index} />}
      {blockItem && blockItem.key === 'image' && <ImageBlock blockItem={blockItem} index={index} />}
      {blockItem && blockItem.key === 'info' && <Info blockItem={blockItem} index={index} />}
    </>
  )
}

export default BlockItems
