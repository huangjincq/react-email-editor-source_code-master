import { useContext, useCallback, useEffect } from 'react'
import { GlobalContext } from '../../reducers'
import { throttle } from '../../utils/helpers'
import LeftSideBar from '../LeftSideBar'
import Preview from '../Preview'
import Header from '../Header'
import RightSetting from '../RightSetting'
import { getEmptyColumnConfig, getColumnConfig } from '../../configs/getColumnConfig'
import { BlockKeyEnum } from '../../types'
import { cloneDeep } from 'lodash-es'

const emptyConfig = getColumnConfig(BlockKeyEnum.Empty)

const Main = () => {
  const { blockList, setBlockList, currentItem, setCurrentItem, setIsDragStart } = useContext(GlobalContext)

  const clearLabelStyles = () => {
    const dragLabelElements = document.getElementsByClassName('block-drag-label-content')
    Array.from(dragLabelElements).forEach((item: any) => {
      item.children[0].style.visibility = 'hidden'
    })
  }

  const clearContentLabelStyles = () => {
    const dragContentLabelElements = document.getElementsByClassName('block-content-drag-label-content')
    Array.from(dragContentLabelElements).forEach((item: any) => {
      item.children[0].style.visibility = 'hidden'
    })
  }

  const onDragOver = useCallback(
    throttle((event: any) => {
      event.preventDefault()
      event.stopPropagation()
      const { index } = event.target.dataset
      switch (event.target.dataset.type) {
        case 'empty-block':
          clearLabelStyles()
          clearContentLabelStyles()
          event.target.style.border = '1px dashed #2faade'
          break

        case 'drag-over-column':
          clearContentLabelStyles()
          const dragLabelElements = document.getElementsByClassName('block-drag-label-content')
          Array.from(dragLabelElements).forEach((item: any) => {
            if (Number(item.dataset.index) === Number(index)) {
              item.children[0].style.visibility = 'visible'
            } else {
              item.children[0].style.visibility = 'hidden'
            }
          })
          break

        case 'block-item-move':
          clearLabelStyles()
          const dragBlockItemElements = document.getElementsByClassName('block-content-drag-label-content')
          Array.from(dragBlockItemElements).forEach((item: any) => {
            if (item.dataset.index === index) {
              item.children[0].style.visibility = 'visible'
            } else {
              item.children[0].style.visibility = 'hidden'
            }
          })
          break

        case 'empty-block-item':
          clearLabelStyles()
          clearContentLabelStyles()
          const parentNode = event.target.parentNode
          parentNode &&
            parentNode.classList.contains('block-empty-content') &&
            (parentNode.style.outlineStyle = 'solid')
          break
        default:
          clearLabelStyles()
          clearContentLabelStyles()
          break
      }
    }, 30),
    []
  )
  const onDrop = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    const { type } = event.target.dataset
    setIsDragStart(false)
    switch (type) {
      // 第一次添加元素
      case 'empty-block':
        if (currentItem.data.key !== 'column') {
          const newCurrentItem = getEmptyColumnConfig(currentItem.data)
          setCurrentItem({ data: currentItem.data, type: 'edit', index: '0-0-0' })
          setBlockList([newCurrentItem], 'add')
        } else {
          const newCurrentItem = getEmptyColumnConfig()
          setCurrentItem({ data: newCurrentItem, type: 'edit', index: 0 })
          setBlockList([newCurrentItem], 'add')
        }
        break
      case 'empty-block-item':
        clearEmptyContentStyles()
        const { index } = event.target.dataset
        const newBlockList = cloneDeep(blockList)
        const indexArr = index.split('-')
        const blockIndex = indexArr[0]
        const itemIndex = indexArr[1]
        newBlockList[blockIndex].children[itemIndex].children = [currentItem.data]
        if (currentItem.type === 'move') {
          // 删除原来的元素，如果原来的元素删除后children为空，贼添加一个empty content
          const { index: oldIndex } = currentItem
          const oldIndexArr = oldIndex.split('-')
          const oldBlockIndex = oldIndexArr[0]
          const oldItemIndex = oldIndexArr[1]
          const oldItem = newBlockList[oldBlockIndex].children[oldItemIndex]
          if (oldItem.children.length === 1) {
            newBlockList[oldBlockIndex].children[oldItemIndex].children = [emptyConfig]
          } else {
            newBlockList[oldBlockIndex].children[oldItemIndex].children = oldItem.children.filter(
              (item: any, index: number) => index !== Number(oldIndexArr[2])
            )
          }
        }
        setCurrentItem({ ...currentItem, type: 'edit', index })
        setBlockList([...newBlockList], 'move')
        break
      case 'drag-over-column':
        {
          const { position, index } = event.target.dataset
          const newBlockList = cloneDeep(blockList)
          let newCurrentItem = cloneDeep(currentItem)
          if (currentItem.type === 'add') {
            newBlockList.splice(index, 0, currentItem.data)
            newCurrentItem = { ...currentItem, type: 'edit', index }
          } else if (currentItem.type === 'move') {
            const moveItem = newBlockList.splice(currentItem.index, 1)[0]
            newBlockList.splice(index, 0, moveItem)
            newCurrentItem = { ...currentItem, type: 'edit', index: position === 'top' ? Number(index) : index - 1 }
          }
          setCurrentItem({ ...newCurrentItem })
          setBlockList([...newBlockList], 'move')
        }

        setTimeout(() => {
          const dragLabelElements = document.getElementsByClassName('block-drag-label-content')
          Array.from(dragLabelElements).forEach((item: any) => {
            item.children[0].style.visibility = 'hidden'
          })
        }, 30)

        break
      case 'block-item-move':
        {
          const { position, index } = event.target.dataset
          const newBlockList = cloneDeep(blockList)
          const indexArr = index.split('-')
          const blockIndex = indexArr[0]
          const contentIndex = indexArr[1]
          const itemIndex = indexArr[2]
          const blockItem = newBlockList[blockIndex].children[contentIndex].children
          let newCurrentItem = cloneDeep(currentItem)
          if (currentItem.type === 'add') {
            blockItem.splice(itemIndex, 0, currentItem.data)
            newCurrentItem = { ...currentItem, type: 'edit', index }
          }
          if (currentItem.type === 'move') {
            const oldIndexArr = currentItem.index.split('-')
            const oldBlockIndex = oldIndexArr[0]
            const oldContentIndex = oldIndexArr[1]
            const oldItemIndex = oldIndexArr[2]
            const oldItem = newBlockList[oldBlockIndex].children[oldContentIndex].children
            // 移动currentItem.data，可以在当前的oldItem中移动，也可能会在其他的oldItem中移动
            if (oldBlockIndex === blockIndex && oldContentIndex === contentIndex) {
              // 在同一个blockItem中移动

              if (oldItemIndex < itemIndex) {
                const moveItem = oldItem.splice(oldItemIndex, 1)[0]
                blockItem.splice(position === 'top' ? Number(itemIndex) : itemIndex - 1, 0, moveItem)
                newCurrentItem = {
                  ...currentItem,
                  type: 'edit',
                  index: `${blockIndex}-${contentIndex}-${position === 'top' ? Number(itemIndex) : itemIndex - 1}`
                }
              } else {
                const moveItem = oldItem.splice(oldItemIndex, 1)[0]
                blockItem.splice(position === 'top' ? Number(itemIndex) : itemIndex, 0, moveItem)
                newCurrentItem = {
                  ...currentItem,
                  type: 'edit',
                  index: `${blockIndex}-${contentIndex}-${position === 'top' ? Number(itemIndex) : itemIndex}`
                }
              }
            } else {
              // 在不同的blockItem中移动，将其添加到新的blockItem中并且删除原来的元素，如果原来的元素删除后children为空，贼添加一个empty content

              const moveItem = oldItem.splice(oldItemIndex, 1)[0]
              blockItem.splice(position === 'top' ? Number(itemIndex) : itemIndex, 0, moveItem)

              if (oldItem.length === 0) {
                newBlockList[oldBlockIndex].children[oldContentIndex].children = [emptyConfig]
              }
              newCurrentItem = {
                ...currentItem,
                type: 'edit',
                index: `${blockIndex}-${contentIndex}-${position === 'top' ? Number(itemIndex) : itemIndex}`
              }
            }
          }
          setCurrentItem({ ...newCurrentItem })
          setBlockList([...newBlockList], 'move')
        }
        setTimeout(() => {
          const dragBlockItemElements = document.getElementsByClassName('block-content-drag-label-content')
          Array.from(dragBlockItemElements).forEach((item: any) => {
            item.children[0].style.visibility = 'hidden'
          })
        }, 30)
        break
      default:
        break
    }
  }

  const clearEmptyContentStyles = () => {
    document.querySelectorAll('.block-empty-content').forEach((item: any) => {
      item.style.outlineStyle = ''
    })
  }

  const clearStyles = () => {
    clearLabelStyles()
    clearContentLabelStyles()
    clearEmptyContentStyles()
  }

  const onDragLeave = (event: any) =>
    setTimeout(() => {
      switch (event.target.dataset.type) {
        case 'empty-block':
          event.target.style.border = ''
          break
        case 'empty-block-item':
          event.target.parentNode && (event.target.parentNode.style.outlineStyle = '')
          break
        case 'drag-over-column':
        default:
          break
      }
    }, 50)

  return (
    <>
      <div className="email-editor" onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave}>
        <Header />
        <div className="email-editor-main">
          <LeftSideBar clearStyles={clearStyles} />
          <Preview clearStyles={clearStyles} />
          <RightSetting />
        </div>
      </div>
    </>
  )
}

export default Main
