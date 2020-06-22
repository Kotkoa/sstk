import React from 'react'
import FileUpload from './fileupload'

const Home = () => {
  return (
    <div className="bg-gray-100 py-6 h-screen">
      <h4 className="Title text-center text-xl text-gray-900 font-semibold leading-tight mb-2">
        Get AI keywords for free
      </h4>
      <p className="Title text-center text-xs text-gray-600 leading-tight mb-4 italic font-light leading-tight w-64 mx-auto">
        * - limits: 1 file per 25 seconds, jpeg or png images can be no larger than 1 mb and can be
        no larger than 2000 pixels in width or height
      </p>
      <FileUpload />
    </div>
  )
}

Home.propTypes = {}

export default Home
