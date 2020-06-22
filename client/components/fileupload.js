import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setDisplayWords, setUrl, addUri, addKeywords } from '../redux/reducers/states'

const FileUpload = () => {
  const dispatch = useDispatch()

  const displayWords = useSelector((store) => store.state.displayWords)
  const url = useSelector((store) => store.state.url)

  const [tble, setTble] = useState([0])
  const [names, setNames] = useState(['filename.jpg'])

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
    const snames = arr.map((it, id) => e.target.files[id].name)
    setTble(arr)
    setNames(snames)
    setSrc(arr, images)
  }

  const onClick = async () => {
    function timer(ms) {
      return new Promise((res) => setTimeout(res, ms))
    }

    async function load() {
      for (let i = 0; i < url.length; i += 1) {
        // eslint-disable-next-line no-console
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
    <div className="Body flex flex-col max-w-3xl mx-auto align-middle">
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
        {tble.map((it, id) => {
          return (
            <div key={it} className="productCard flex items-center pb-2">
              <img
                className="shadow-md rounded-md h-40 w-64 object-cover"
                src={url[id] || 'images/wave.jpg'}
                alt={names[id]}
              />
              <div className="TextField px-4">
                <div className="title pb-4">{names[id]}</div>
                <div className="mb-2">
                  <p className="text-gray-800">
                    {displayWords[id] ||
                      'example, drink, cup, coffee, white, natural, beverage, wooden, table, hot, wood, food, morning, fresh, view, tea, mug, nature, breakfast, concept, holiday, brown, space, caffeine, lifestyle, top, isolated, summer, aroma'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FileUpload
