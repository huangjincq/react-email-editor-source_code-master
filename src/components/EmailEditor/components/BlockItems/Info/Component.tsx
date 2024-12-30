import { Row, Col } from 'antd'
import { IBlockItemProps } from '../../../types'
import { IInfoValue } from './type'

interface InfoComponentProps extends IBlockItemProps<IInfoValue> {}
const InfoComponent = ({ value = {} as IInfoValue, styles }: InfoComponentProps) => {
  const { dataSource, labelSpan } = value

  return (
    <div className="relative">
      <div style={styles}>
        {dataSource.map((data) => (
          <Row className="block-item-info" key={data.fieldId}>
            <Col className="info-label" span={labelSpan}>
              {data.displayName}:
            </Col>
            <Col>{data.fieldId}</Col>
          </Row>
        ))}
      </div>
    </div>
  )
}

export default InfoComponent
