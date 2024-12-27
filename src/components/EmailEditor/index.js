import { useReducer } from 'react'
import {
  GlobalContext,
  reducer,
  setBlockList,
  setActionType,
  setCurrentItem,
  setBodySettings,
  setIsDragStart,
  setSelectionRange,
  setTextRange,
  defaultState,
  setLanguage,
  setLanguageLibraries
} from './reducers'
import Main from './components/Main'
import './assets/App.css'

const EmailEditor = ({ defaultBlockList }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    blockList: defaultBlockList ? defaultBlockList : defaultState.blockList
  })

  return (
    <GlobalContext.Provider
      value={{
        blockList: state.blockList,
        actionType: state.actionType,
        currentItem: state.currentItem,
        bodySettings: state.bodySettings,
        isDragStart: state.isDragStart,
        selectionRange: state.selectionRange,
        textRange: state.textRange,
        setIsDragStart: (isDragStart) => {
          dispatch(setIsDragStart(isDragStart))
        },
        setBodySettings: (bodySettings, actionType) => {
          actionType && dispatch(setActionType(actionType))
          dispatch(setBodySettings(bodySettings))
        },
        setBlockList: (blockList, actionType) => {
          actionType && dispatch(setActionType(actionType))
          dispatch(setBlockList(blockList))
        },
        setCurrentItem: (currentItem) => {
          dispatch(setCurrentItem(currentItem))
        },
        setSelectionRange: (selectionRange) => {
          dispatch(setSelectionRange(selectionRange))
        },
        setTextRange: (textRange) => {
          dispatch(setTextRange(textRange))
        },
        setActionType: (actionType) => {
          dispatch(setActionType(actionType))
        },
        setLanguage: (language) => {
          dispatch(setLanguage(language))
        },
        setLanguageLibraries: (languageLibraries) => {
          dispatch(setLanguageLibraries(languageLibraries))
        }
      }}
    >
      <Main language="en" />
    </GlobalContext.Provider>
  )
}

export default EmailEditor
