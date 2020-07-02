const CLEAR_LIST = 'CLEAR_LIST'
const ADD_LIST = 'ADD_LIST'
const CHANGE_KEYWORD = 'CHANGE_KEYWORD'
const SET_MSG = 'SET_MSG'

const initialState = {
  list: [],
  message: 'none'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_LIST:
      return {
        ...state,
        list: [
          {
            filename: 'filename.jpg',
            url: 'images/wave.jpg',
            size: 123
          }
        ]
      }

    case ADD_LIST:
      if (typeof state.list[0].filename !== 'undefined') {
        return {
          ...state,
          list: [action.arr]
        }
      }
      return {
        ...state,
        list: [...state.list, action.arr]
      }

    case CHANGE_KEYWORD: {
      const newList = state.list.map((it, id) =>
        id === action.id ? { ...it, word: action.words } : it
      )
      return {
        ...state,
        list: newList
      }
    }

    case SET_MSG:
      return {
        ...state,
        message: action.text
      }

    default:
      return state
  }
}

export function clearList() {
  return { type: CLEAR_LIST }
}

export function addList(arr) {
  // const arr = Object.values(data).map((it) => ({ name: it.name }))
  return { type: ADD_LIST, arr }
}

export function replaceKeyword(id, words) {
  return { type: CHANGE_KEYWORD, id, words }
}

export function setMsg(text) {
  return { type: SET_MSG, text }
}

export function maxFilecount(e) {
  const maxCount = 10
  const arrayFiles = e.target.files
  if (arrayFiles.length > maxCount) {
    e.target.value = null
    return true
  }
  return false
}
