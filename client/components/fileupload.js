/* eslint-disable no-await-in-loop */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { clearList, addList, replaceKeyword, setMsg } from '../redux/reducers/states'

const FileUpload = () => {
  const IMAGE_FILES = '.jpg, .jpeg, .png'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearList())
  }, [dispatch])

  const list = useSelector((store) => store.state.list)
  const message = useSelector((store) => store.state.message)

  const maxFilecount = (e) => {
    const maxCount = 10
    const arrayFiles = e.target.files
    if (arrayFiles.length > maxCount) {
      e.target.value = null
      dispatch(setMsg('Hey! hey! hey! Only 10 images max!! Please, make anoser choise.'))
      return false
    }
    return true
  }

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const obj = {
          data: reader.result,
          name: file.name,
          size: file.size,
          type: file.type,
          word: 'ready for Keywords'
        }
        dispatch(addList(obj))
        return resolve(obj)
      }
      reader.readAsDataURL(file)
    })
  }

  const onChange = (e) => {
    maxFilecount(e)
    const images = e.target.files
    Object.keys(images).forEach((it, id) => getBase64(images[id]))
  }

  const onClick = async () => {
    function timer(ms) {
      return new Promise((res) => setTimeout(res, ms))
    }

    async function load() {
      for (let i = 0; i < list.length; i += 1) {
        const str = list[i].data
        const removePrefix = ';base64,'
        const slice2Uri = str.slice(str.indexOf(removePrefix) + removePrefix.length)
        dispatch(replaceKeyword(i, 'Fetching the keywords'))
        if (i > 0) await timer(25000)
        try {
          const { data: res } = await axios.post('/api/v1/keyword', {
            url: slice2Uri
          })
          const words = typeof res !== 'undefined' ? res.data.join(', ') : 'No respond'
          dispatch(replaceKeyword(i, words))
        } catch (err) {
          // console.log(err)
        }
      }
    }

    load()
  }

  return (
    <div className="container-input flex flex-col mx-auto align-middle px-2">
      <div className="relative flex justify-center">
        <button
          type="button"
          className={`container-list__message ${
            message === 'none'
              ? 'hidden'
              : 'flex px-6 py-2 rounded-full bg-orange-300 border border-orange-600 justify-center items-center shadow-md absolute'
          }`}
          onClick={() => dispatch(setMsg('none'))}
        >
          {message}
        </button>
      </div>
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
