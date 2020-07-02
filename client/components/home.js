import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUpload from './fileupload'
import ImgKeywords from './imgkeywords'
import Message from './message'
// import DropImages from './dndzone'
import { setMsg } from '../redux/reducers/states'

const Home = () => {
  const dispatch = useDispatch()
  const message = useSelector((store) => store.state.message)

  useEffect(() => {
    const cb = () => {
      dispatch(setMsg('none'))
    }
    document.addEventListener('click', cb)
    return () => {
      document.removeEventListener('click', cb)
    }
  })

  return (
    <div
      className={`${
        message !== 'none' ? 'cursor-pointer' : ''
      } body bg-gray-100 min-h-screen w-screen`}
    >
      <div className="container-body max-w-2xl mx-auto">
        <h4 className="text__title text-center text-xl text-gray-900 font-semibold leading-tight py-2 sm:py-4">
          Get AI keywords for free
        </h4>
        <p className="text__description text-gray-600 px-2 sm:px-0 italic font-light leading-tight sm:max-w-xl sm:mx-auto mb-2 sm:mb-4 sm:text-center text-sm">
          * - limits: jpeg or png images can be no larger than 1 mb and can be no larger than 2000
          pixels in width or height, delay up to 25 seconds
        </p>
        <FileUpload />
        <Message />
        {/* <DropImages /> */}
        <ImgKeywords />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
