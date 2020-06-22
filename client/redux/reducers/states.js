const SET_DISPLAYWORDS = 'SET_DISPLAYWORDS'
const SET_URL = 'SET_URL'
const SET_LIST = 'SET_LIST'
const ADD_KEYWORD = 'ADD_KEYWORD'
const ADD_URI = 'ADD_URI'

const initialState = {
  displayWords: [],
  url: [],
  name: [],
  list: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAYWORDS:
      return {
        ...state,
        displayWords: []
      }

    case ADD_KEYWORD:
      return {
        ...state,
        displayWords: [...state.displayWords, action.words]
      }
    // { ...state.displayWords, [action.id]: action.words }

    case SET_LIST:
      return {
        ...state,
        list: action.files
      }

    case SET_URL:
      return {
        ...state,
        url: []
      }

    case ADD_URI:
      return {
        ...state,
        url: [...state.url, action.url]
      }

    default:
      return state
  }
}

export function setDisplayWords() {
  const any = null
  return { type: SET_DISPLAYWORDS, any }
}

export function addKeywords(words) {
  return { type: ADD_KEYWORD, words }
}

export function setUrl() {
  const any = null
  return { type: SET_URL, any }
}

export function setList(files) {
  return { type: SET_URL, files }
}

export function addUri(url) {
  return { type: ADD_URI, url }
}
