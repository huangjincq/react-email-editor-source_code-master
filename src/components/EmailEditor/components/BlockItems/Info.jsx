import { Row, Col } from 'antd'

const Info = ({ blockItem }) => {
  const { dataSource, contentStyles, labelSpan } = blockItem

  return (
    <div className="relative">
      <div style={contentStyles}>
        {dataSource.map((data) => (
          <Row className="block-item-info" key={data.field}>
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

export default Info
