import React from 'react'
import { useSelector } from 'react-redux'

const EXAMPLE_KEYWORDS =
  'example: drink, natural, beverage, wooden, table, wood, food, morning, fresh, view, tea, breakfast, concept, lifestyle ...'

const ImgKeywords = () => {
  const list = useSelector((store) => store.state.list)

  return (
    <div className="container-list px-2">
      {list.map((img) => (
        <div key={img.size} className="card-one-file flex items-center pb-2">
          <img
            className="card-image hadow-lg rounded-md h-40 w-64 object-cover"
            src={img.data || 'images/wave.jpg'}
            alt={img.name}
          />
          <div className="card-textfield px-4">
            <div className="card-textfield__file-name pb-6">{img.name || 'photo.jpg'}</div>
            <div className="card-textfield__ mb-2">
              <p className="text-gray-800">{img.word || EXAMPLE_KEYWORDS}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImgKeywords
