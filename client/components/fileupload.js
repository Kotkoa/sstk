/* eslint-disable no-await-in-loop */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  setDisplayWords,
  setUrl,
  addUri,
  addKeywords,
  setGrid,
  addGrid,
  setName,
  addName,
  replaceKeyword
} from '../redux/reducers/states'

const FileUpload = () => {
  const IMAGE_FILES = '.jpg, .jpeg, .png'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setGrid([0]))
    dispatch(setName('filename.jpg'))
  }, [])

  const url = useSelector((store) => store.state.url)

  const maxFilecount = (e) => {
    const maxCount = 10
    const arrayFiles = e.target.files
    if (arrayFiles.length > maxCount) {
      e.target.value = null
      alert('Only 10 images max')
      return false
    }
    return true
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        dispatch(addUri(reader.result))
        resolve(reader.result)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const onChange = (e) => {
    maxFilecount(e)
    const images = e.target.files
    const col = images.length
    const arr = new Array(col).fill(0).map((it, id) => id)
    const snames = arr.map((it, id) => e.target.files[id].name)
    dispatch(setUrl())
    dispatch(setDisplayWords())
    // dispatch(setGrid([0]))

    dispatch(addGrid(arr))
    dispatch(addName(snames))
    arr.forEach((it, id) => {
      dispatch(addKeywords(id, 'ready for Keywords'))
      getBase64(images[id])
    })
  }

  const onClick = async () => {
    function timer(ms) {
      return new Promise((res) => setTimeout(res, ms))
    }

    async function load() {
      for (let i = 0; i < url.length; i += 1) {
        const slice2Uri = url[i].slice(url[i].indexOf('data:image/jpeg;base64,') + 23)
        dispatch(replaceKeyword(i, 'Fetching the keywords'))
        if (i > 0) await timer(25000)
        try {
          const { data: res } = await axios.post('/api/v1/keyword', {
            url: slice2Uri
          })
          const words = typeof res !== 'undefined' ? res.data.join(', ') : 'No respond'
          dispatch(replaceKeyword(i, words))
        } catch (err) {
          console.log(err)
        }
      }
    }

    load()
  }

  return (
    <div className="container-input flex flex-col mx-auto align-middle px-2">
      <div className="container-input__buttons flex justify-between mb-4">
        <input
          type="file"
          multiple
          name="img"
          id="file-selector"
          accept={IMAGE_FILES}
          onChange={onChange}
          className=""
        />
        <button
          type="button"
          onClick={onClick}
          className="border border-gray-600 rounded-sm h-8 px-2 hover:bg-gray-300 bg-gray-200"
        >
          Keywords
        </button>
      </div>
    </div>
  )
}

export default FileUpload
