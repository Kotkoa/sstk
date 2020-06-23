import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import {
  setDisplayWords,
  setUrl,
  addUri,
  addKeywords,
  setGrid,
  addGrid,
  setName,
  addName
} from '../redux/reducers/states'

const FileUpload = ({ onDrop, accept }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setGrid([0]))
    dispatch(setName('filename.jpg'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  })

  const url = useSelector((store) => store.state.url)

  const maxFilecount = (e) => {
    const maxCount = 10
    const arrayFiles = e.target.files
    if (arrayFiles.length > maxCount) {
      e.target.value = null
      // eslint-disable-next-line no-alert
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

  const setSrc = (arr, images) => {
    // eslint-disable-next-line no-unused-vars
    const set = Promise.all(arr.map((it, id) => getBase64(images[id]))).then((results) => results)
  }

  const onChange = (e) => {
    const images = e.target.files
    maxFilecount(e)
    const col = images.length
    const arr = new Array(col).fill(0).map((it, id) => id)
    dispatch(setUrl())
    dispatch(setDisplayWords())
    dispatch(setGrid([0]))
    dispatch(setName(['filename.jpg']))
    const snames = arr.map((it, id) => e.target.files[id].name)
    dispatch(addGrid(arr))
    dispatch(addName(snames))
    setSrc(arr, images)
  }

  const onClick = async () => {
    function timer(ms) {
      return new Promise((res) => setTimeout(res, ms))
    }

    async function load() {
      for (let i = 0; i < url.length; i += 1) {
        const slice2Uri = url[i].slice(url[i].indexOf('data:image/jpeg;base64,') + 23)
        try {
          // eslint-disable-next-line no-await-in-loop
          const { data: res } = await axios.post('/api/v1/keyword', {
            url: slice2Uri
          })
          // eslint-disable-next-line no-console
          console.log(typeof res === 'undefined' || 'success')
          const words = typeof res !== 'undefined' ? res.data.join(', ') : 'null'
          dispatch(addKeywords(words))
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
        // eslint-disable-next-line no-await-in-loop
        await timer(25000)
      }
    }

    load()
  }

  return (
    <div className="Body flex flex-col mx-auto align-middle">
      <div className="Input mb-4 px-2">
        <div className="buttons flex justify-between pb-4">
          <input
            type="file"
            multiple
            name="img"
            id="file-selector"
            accept=".jpg, .jpeg, .png"
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
        <div className="DnD">
          <div {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
              {isDragActive ? (
                <p className="dropzone-content">Release to drop the files here</p>
              ) : (
                <p className="dropzone-content">
                  Drag &apos;n&apos; drop some files here, or click to select files
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
