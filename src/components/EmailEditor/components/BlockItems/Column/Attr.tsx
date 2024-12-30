import { useContext, useState } from 'react'
import { GlobalContext } from '../../../reducers'
import classNames from '../../../utils/classNames'
import { Modal, Tabs } from 'antd'
import columnsSetting from '../../../configs/columnsSetting'
import ColorPicker from '../../ColorPicker'
import PaddingSettings from '../../StyleSettings/PaddingSettings'
import CardItemElement from '../../CardItemElement'
import { cloneDeep } from 'lodash-es'

const columnList = [
  {
    key: 'full',
    widths: ['100%']
  },
  {
    key: '1-1',
    widths: ['50%', '50%']
  },
  {
    key: '1-1-1',
    widths: ['33.33%', '33.33%', '33.33%']
  },
  {
    key: '1-1-1-1',
    widths: ['25%', '25%', '25%', '25%']
  },
  {
    key: '1-2',
    widths: ['33.33%', '66.66%']
  },
  {
    key: '2-1',
    widths: ['66.66%', '33.33%']
  },
  {
    key: '2-4-2-4',
    widths: ['16.66%', '33.33%', '16.66%', '33.33%']
  },
  {
    key: '4-2-4-2',
    widths: ['33.33%', '16.66%', '33.33%', '16.66%']
  }
]

const ColumnAttr = () => {
  const { currentItem, setBlockList, blockList, setCurrentItem } = useContext(GlobalContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentColumnType, setCurrentColumnType] = useState<string | null>(null)

  const _currentItemChange = (newCurrentItem: any) => {
    const newBlockList = cloneDeep(blockList)
    newBlockList[currentItem.index] = newCurrentItem.data

    setBlockList(newBlockList, `edit_${new Date().getTime()}`)
    setCurrentItem(newCurrentItem)
  }

  const columnChange = (type: string) => () => {
    if (currentItem.data.children.length > columnsSetting[type].children.length) {
      setIsModalOpen(true)
      setCurrentColumnType(type)
      return
    }
    const newColumnConfig = columnsSetting[type]
    const newCurrentItem = cloneDeep(currentItem)

    newCurrentItem.data = {
      ...currentItem.data,
      ...newColumnConfig,
      children: newColumnConfig.children.map((item: any, index: number) => {
        let newItem = item
        if (currentItem.data.children[index]) {
          newItem = { ...currentItem.data.children[index], propValue: item.propValue }
        }
        return { ...newItem }
      })
    }
    _currentItemChange(newCurrentItem)
  }

  const handleOk = () => {
    const newColumnConfig = columnsSetting[currentColumnType!]

    const newCurrentItem = cloneDeep(currentItem)

    newCurrentItem.data = {
      ...currentItem.data,
      ...newColumnConfig,
      children: newColumnConfig.children.map((item: any, index: number) => {
        let newItem = item
        if (currentItem.data.children[index]) {
          newItem = { ...currentItem.data.children[index], propValue: item.propValue }
        }
        return { ...newItem }
      })
    }

    _currentItemChange(newCurrentItem)

    setIsModalOpen(false)
    setCurrentColumnType(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handlePaddingChange = (padding: any) => {
    const newCurrentItem = cloneDeep(currentItem)
    newCurrentItem.data.styles = padding
    _currentItemChange(newCurrentItem)
  }
  const handleStyleChange =
    (key: string) =>
    ({ hex }: any) => {
      const newCurrentItem = cloneDeep(currentItem)
      newCurrentItem.data.styles[key] = hex
      _currentItemChange(newCurrentItem)
    }

  const handleContentStyleChange = (key: string, index: number) => (value: string) => {
    const newCurrentItem = cloneDeep(currentItem)
    newCurrentItem.data.children[index].styles[key] = value
    _currentItemChange(newCurrentItem)
  }

  const handleContentPaddingChange = (index: any) => (padding: any) => {
    const newCurrentItem = cloneDeep(currentItem)
    newCurrentItem.data.children[index].styles = padding
    _currentItemChange(newCurrentItem)
  }

  const columnListElement = () => {
    return (
      <>
        <div className="right-setting-block-item-title">Columns</div>
        <div>
          {columnList.map((item, index) => {
            return (
              <div
                className={classNames(
                  currentItem.data.type === item.key ? 'column-item-active' : 'column-item-un_active',
                  'column-item'
                )}
                key={index}
                onClick={columnChange(item.key)}
              >
                {item.widths.map((width, index) => {
                  const isLast = index === item.widths.length - 1
                  return (
                    <span
                      key={index}
                      style={{ width }}
                      className={classNames(
                        isLast ? '' : 'column-item-border-right',
                        currentItem.data.type === item.key ? 'column-item-active' : 'column-item-un_active',
                        'height-full'
                      )}
                    ></span>
                  )
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  }

  const columnContentElement = () => {
    return (
      <>
        <div className="right-setting-block-item-title">Column Settings</div>
        <Tabs
          defaultActiveKey="1"
          animated={{
            inkBar: true,
            tabPane: true
          }}
          items={currentItem.data.children.map((item: any, index: number) => {
            const key = index + 1
            const backgroundColor = item.styles?.backgroundColor
            return {
              label: `Column ${key}`,
              key: key,
              children: (
                <>
                  <CardItemElement title="Content Background Color">
                    <ColorPicker
                      color={backgroundColor}
                      setColor={({ hex }: any) => handleContentStyleChange('backgroundColor', index)(hex)}
                    />
                  </CardItemElement>
                  <PaddingSettings padding={item.styles} setPadding={handleContentPaddingChange(index)} />
                </>
              )
            }
          })}
        />
      </>
    )
  }

  const columnStylesElement = () => {
    return (
      <>
        <div className="right-setting-block-item-title">Column Styles</div>
        <CardItemElement title="Background Color">
          <ColorPicker
            color={currentItem.data.styles?.backgroundColor}
            setColor={handleStyleChange('backgroundColor')}
          />
        </CardItemElement>
        <CardItemElement title="Content Background Color">
          <ColorPicker
            color={currentItem.data.styles?.contentBackground}
            setColor={handleStyleChange('contentBackground')}
          />
        </CardItemElement>
        <PaddingSettings padding={currentItem.data.styles} setPadding={handlePaddingChange} />
      </>
    )
  }

  return (
    <>
      <div className="margin-y-30">
        {columnListElement()}
        {columnContentElement()}
        {columnStylesElement()}
      </div>
      <Modal title="Delete Column" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={400}>
        <p
          className="margin-y-30"
          dangerouslySetInnerHTML={{
            __html: `Are you sure you want to delete <span class="column-modal-context">${currentColumnType ? currentItem.data.children.length - columnsSetting[currentColumnType].children.length : 0}</span> extra columns? `
          }}
        ></p>
      </Modal>
    </>
  )
}

export default ColumnAttr
