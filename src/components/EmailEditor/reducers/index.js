import { createContext } from 'react'

const SET_BLOCK_LIST = 'SET_BLOCK_LIST'
const SET_IS_DRAG_START = 'SET_IS_DRAG_START'
const SET_ACTION_TYPE = 'SET_ACTION_TYPE'
const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'
const SET_BODY_SETTINGS = 'SET_BODY_SETTINGS'
const SET_SELECTION_RANGE = 'SET_SELECTION_RANGE'
const SET_TEXT_RANGE = 'SET_TEXT_RANGE'

export const setTextRange = (textRange) => {
  return {
    type: SET_TEXT_RANGE,
    textRange: textRange
  }
}

export const setSelectionRange = (selectionRange) => {
  return {
    type: SET_SELECTION_RANGE,
    selectionRange: selectionRange
  }
}

export const setBlockList = (blockList) => {
  return {
    type: SET_BLOCK_LIST,
    blockList: blockList
  }
}

export const setIsDragStart = (isDragStart) => {
  return {
    type: SET_IS_DRAG_START,
    isDragStart: isDragStart
  }
}

export const setActionType = (actionType) => {
  return {
    type: SET_ACTION_TYPE,
    actionType: actionType
  }
}

export const setCurrentItem = (currentItem) => {
  return {
    type: SET_CURRENT_ITEM,
    currentItem: currentItem
  }
}

export const setBodySettings = (bodySettings) => {
  return {
    type: SET_BODY_SETTINGS,
    bodySettings: bodySettings
  }
}

export const defaultBlockList = []
export const defaultIsDragStart = false
export const defaultActionType = 'firstRender' // firstRender, add, move, delete,edit, set_history_${index}, edit_${Date.now()}
export const defaultCurrentItem = null
export const defaultBodySettings = {
  preHeader: '',
  contentWidth: '90%',
  styles: {
    backgroundColor: '#9ca3af',
    color: '#000',
    fontFamily: 'Arial'
  }
}
export const defaultSelectionRange = null
export const textRange = null

export const defaultState = {
  blockList: defaultBlockList,
  isDragStart: defaultIsDragStart,
  actionType: defaultActionType,
  currentItem: defaultCurrentItem,
  bodySettings: defaultBodySettings,
  selectionRange: defaultSelectionRange,
  textRange: textRange
}

export const GlobalContext = createContext()

export function reducer(state, action) {
  switch (action.type) {
    case SET_BLOCK_LIST:
      return {
        ...state,
        blockList: action.blockList
      }
    case SET_IS_DRAG_START:
      return {
        ...state,
        isDragStart: action.isDragStart
      }
    case SET_ACTION_TYPE:
      return {
        ...state,
        actionType: action.actionType
      }
    case SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.currentItem
      }
    case SET_BODY_SETTINGS:
      return {
        ...state,
        bodySettings: action.bodySettings
      }
    case SET_SELECTION_RANGE:
      return {
        ...state,
        selectionRange: action.selectionRange
      }
    case SET_TEXT_RANGE:
      return {
        ...state,
        textRange: action.textRange
      }
    default:
      return state
  }
}
