import React from 'react'
import { useSelector } from 'react-redux'

const ImgKeywords = () => {
  const displayWords = useSelector((store) => store.state.displayWords)
  const url = useSelector((store) => store.state.url)
  const name = useSelector((store) => store.state.name)
  const grid = useSelector((store) => store.state.grid)
  return (
    <div className="Output px-2">
      {grid.map((it, id) => {
        return (
          <div key={it} className="productCard flex items-center pb-2">
            <img
              className="shadow-md rounded-md h-40 w-64 object-cover"
              src={url[id] || 'images/wave.jpg'}
              alt={name[id]}
            />
            <div className="TextField px-4">
              <div className="title pb-4">{name[id]}</div>
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
  )
}

export default ImgKeywords
