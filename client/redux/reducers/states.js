const SET_DISPLAYWORDS = 'SET_DISPLAYWORDS'
const SET_URL = 'SET_URL'
const SET_NAME = 'SET_NAME'
const ADD_NAME = 'ADD_NAME'
const ADD_KEYWORD = 'ADD_KEYWORD'
const ADD_URI = 'ADD_URI'
const SET_GRID = 'SET_GRID'
const ADD_GRID = 'ADD_GRID'

const initialState = {
  displayWords: [],
  url: [],
  name: [],
  grid: []
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

    case SET_NAME:
      return {
        ...state,
        name: [...state.name, action.name]
      }

    case ADD_NAME:
      return {
        ...state,
        name: action.name
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

    case SET_GRID:
      return {
        ...state,
        grid: [0]
      }

    case ADD_GRID:
      return {
        ...state,
        grid: action.arr
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

export function addUri(url) {
  return { type: ADD_URI, url }
}

export function setName(name) {
  return { type: SET_NAME, name }
}

export function addName(name) {
  return { type: ADD_NAME, name }
}

export function setGrid() {
  const any = null
  return { type: SET_GRID, any }
}

export function addGrid(arr) {
  return { type: ADD_GRID, arr }
}
