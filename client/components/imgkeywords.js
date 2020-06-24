import React from 'react'
import { useSelector } from 'react-redux'

const EXAMPLE_KEYWORDS =
  'example: drink, natural, beverage, wooden, table, wood, food, morning, fresh, view, tea, breakfast, concept, lifestyle ...'

const ImgKeywords = () => {
  const displayWords = useSelector((store) => store.state.displayWords)
  const url = useSelector((store) => store.state.url)
  const name = useSelector((store) => store.state.name)
  const grid = useSelector((store) => store.state.grid)
  return (
    <div className="container-list px-2">
      {grid.map((it, id) => (
        <div key={it} className="card-one-file flex items-center pb-2">
          <img
            className="card-image hadow-lg rounded-md h-40 w-64 object-cover"
            src={url[id] || 'images/wave.jpg'}
            alt={name[id]}
          />
          <div className="card-textfield px-4">
            <div className="card-textfield__file-name pb-6">{name[id]}</div>
            <div className="card-textfield__ mb-2">
              <p className="text-gray-800">{displayWords[id] || EXAMPLE_KEYWORDS}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImgKeywords
