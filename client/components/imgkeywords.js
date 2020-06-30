import React from 'react'
import { useSelector } from 'react-redux'

const EXAMPLE_KEYWORDS =
  'example: drink, natural, beverage, wooden, table, wood, food, morning, fresh, view, tea, breakfast, concept, lifestyle ...'

const ImgKeywords = () => {
  const list = useSelector((store) => store.state.list)

  return (
    <div className="container-list sm:px-2">
      {list.map((img) => (
        <div key={img.size} className="card-one-file sm:flex sm:items-center pb-2">
          <img
            className="card-images card-images h-64 object-cover w-full sm:hidden"
            src={img.data || 'images/wave.jpg'}
            alt={img.name}
          />
          <img
            className="card-images hidden sm:flex shadow-md rounded-md h-40 w-64 object-cover"
            src={img.data || 'images/wave.jpg'}
            alt={img.name}
          />
          <div className="card-textfield p-2">
            <p className="card__filename hidden sm:block mb-6">{img.name || 'photo.jpg'}</p>
            <p className="text-gray-800">{img.word || EXAMPLE_KEYWORDS}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImgKeywords
