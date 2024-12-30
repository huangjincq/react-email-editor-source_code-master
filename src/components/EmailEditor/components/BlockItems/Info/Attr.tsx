import { Key } from 'react'
import { Select, Table } from 'antd'
import PaddingSettings from '../../StyleSettings/PaddingSettings'
import { IBlockItemProps } from '../../../types'
import { IInfoValue } from './type'
import CardItemElement from '../../CardItemElement'
const mockDataSourceOptions = [
  {
    label: 'User Info',
    value: 'userInfo',
    fields: [
      {
        displayName: 'Account No.',
        fieldId: 'accountNumber'
      },
      {
        displayName: 'Account Type',
        fieldId: 'accountType'
      },
      {
        displayName: 'Symbol',
        fieldId: 'symbol'
      },
      {
        displayName: 'Quantity',
        fieldId: 'quantity'
      }
    ]
  },
  { label: 'Trade', value: 'trade', fields: [] },
  { label: 'Fee', value: 'fee', fields: [] }
]

interface InfoAttrProps extends IBlockItemProps<IInfoValue> {}

const InfoAttr = ({ value = {} as IInfoValue, styles, onChange, onStylesChange }: InfoAttrProps) => {
  const handleDataSourceChange = (val: string, options: any) => {
    onChange({
      ...value,
      dataSourceKey: val,
      dataSource: options.fields
    })
  }

  const handleLabelSpanChange = (val: any) => {
    onChange({
      ...value,
      labelSpan: val
    })
  }

  const handleDataSourceVisibleChange = (selectedRowKeys: Key[], selectedRows: any[]) => {
    onChange({
      ...value,
      dataSource: selectedRows
    })
  }

  return (
    <div className="margin-y-30">
      <div className="right-setting-block-item-title">Data Source Settings</div>
      <CardItemElement title="Data Source">
        <Select
          className="input-width"
          placeholder="Please select"
          value={value?.dataSourceKey}
          onChange={handleDataSourceChange}
          options={mockDataSourceOptions}
        />
      </CardItemElement>
      <CardItemElement title="Label Width Span">
        <Select
          className="input-width"
          placeholder="Please select"
          value={value?.labelSpan}
          onChange={handleLabelSpanChange}
          showSearch
          options={new Array(24).fill({}).map((v, i) => ({ label: i + 1, value: i + 1 }))}
        />
      </CardItemElement>
      <Table
        size="small"
        rowSelection={{
          columnTitle: 'Visible',
          selectedRowKeys: value?.dataSource?.map((v: any) => v.fieldId) ?? [],
          onChange: handleDataSourceVisibleChange
        }}
        rowKey="fieldId"
        columns={[
          { title: 'Display Name', dataIndex: 'displayName' },
          { title: 'Field Id', dataIndex: 'fieldId' }
        ]}
        dataSource={mockDataSourceOptions?.find((item) => item.value === value?.dataSourceKey)?.fields ?? []}
        pagination={false}
      />
      <div className="right-setting-block-item-title">Padding Settings</div>
      <PaddingSettings padding={styles} setPadding={onStylesChange} />
    </div>
  )
}

export default InfoAttr
