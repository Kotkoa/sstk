import React from 'react'
// import { useDispatch } from 'react-redux'
import FileUpload from './fileupload'
// import { setGrid } from '../redux/reducers/states'
import ImgKeywords from './imgkeywords'

const Home = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(setGrid([0]))
  // }, [dispatch])
  return (
    <div className="bg-gray-100 py-6 h-screen">
      <div className="max-w-3xl mx-auto align-middle">
        <h4 className="Title text-center text-xl text-gray-900 font-semibold leading-tight mb-2">
          Get AI keywords for free
        </h4>
        <p className="Title text-center text-xs text-gray-600 leading-tight mb-4 italic font-light leading-tight w-64 mx-auto">
          * - limits: 1 file per 25 seconds, jpeg or png images can be no larger than 1 mb and can
          be no larger than 2000 pixels in width or height
        </p>
        <FileUpload />
        <ImgKeywords />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
