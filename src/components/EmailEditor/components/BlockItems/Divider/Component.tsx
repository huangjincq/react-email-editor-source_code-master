import { IBlockItemProps } from '../../../types'
interface DividerComponentProps extends IBlockItemProps<undefined> {}

const DividerComponent = ({ value, styles }: DividerComponentProps) => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, ...dividerStyle } = styles

  const wrapperStyles = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    textAlign
  }

  return (
    <div className="relative" style={wrapperStyles}>
      <div style={dividerStyle}></div>
    </div>
  )
}

export default DividerComponent
