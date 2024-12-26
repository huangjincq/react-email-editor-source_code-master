import { useContext, useCallback, useRef, useState } from 'react'
import { GlobalContext } from '../../reducers'
import { Input, Select, Table } from 'antd'
import { throttle, deepClone } from '../../utils/helpers'
import PaddingSettings from './PaddingSettings'
import useLayout from '../../utils/useStyleLayout'

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

const Info = () => {
  const { currentItem } = useContext(GlobalContext)
  const { findStyleItem, paddingChange, updateItemStyles, cardItemElement, inputChange } = useLayout()

  const contentPaddingChange = (padding) => {
    const newData = deepClone(currentItem.data)
    newData.contentStyles = {
      ...newData.contentStyles,
      ...padding
    }
    updateItemStyles(newData)
  }

  const handleDataSourceChange = (value, options) => {
    const newData = deepClone(currentItem.data)
    newData.dataSourceKey = value
    newData.dataSource = options.fields
    updateItemStyles(newData)
  }

  const handleLabelSpanChange = (value) => {
    const newData = deepClone(currentItem.data)
    newData.labelSpan = value
    updateItemStyles(newData)
  }

  const handleDataSourceVisibleChange = (selectedRowKeys, selectedRows) => {
    const newData = deepClone(currentItem.data)
    newData.dataSource = selectedRows
    updateItemStyles(newData)
  }

  return (
    <div className="margin-y-30">
      <div className="right-setting-block-item-title">Data Source Settings</div>
      {cardItemElement(
        'Data Source',
        <Select
          className="input-width"
          placeholder="Please select"
          value={currentItem.data.dataSourceKey}
          onChange={handleDataSourceChange}
          options={mockDataSourceOptions}
        />
      )}
      {cardItemElement(
        'Label Width Span',
        <Select
          className="input-width"
          placeholder="Please select"
          value={currentItem.data.labelSpan}
          onChange={handleLabelSpanChange}
          showSearch
          options={new Array(24).fill({}).map((v, i) => ({ label: i + 1, value: i + 1 }))}
        />
      )}
      <Table
        size="small"
        rowSelection={{
          columnTitle: 'Visible',
          selectedRowKeys: currentItem.data?.dataSource?.map((v) => v.fieldId) ?? [],
          onChange: handleDataSourceVisibleChange
        }}
        rowKey="fieldId"
        columns={[
          { title: 'Display Name', dataIndex: 'displayName' },
          { title: 'Field Id', dataIndex: 'fieldId' }
        ]}
        dataSource={mockDataSourceOptions?.find((item) => item.value === currentItem.data?.dataSourceKey)?.fields ?? []}
        pagination={false}
      />
      <div className="right-setting-block-item-title">Padding Settings</div>
      <PaddingSettings
        padding={{
          paddingTop: findStyleItem(currentItem.data.contentStyles, 'paddingTop'),
          paddingRight: findStyleItem(currentItem.data.contentStyles, 'paddingRight'),
          paddingLeft: findStyleItem(currentItem.data.contentStyles, 'paddingLeft'),
          paddingBottom: findStyleItem(currentItem.data.contentStyles, 'paddingBottom')
        }}
        setPadding={contentPaddingChange}
      />
    </div>
  )
}

export default Info
