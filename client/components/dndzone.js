import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DropImages = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className="flex max-w-3xl border border-gray-600 rounded-sm h-10 hover:bg-gray-300 bg-gray-200 mb-4 mx-2 items-center justify-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag-n-drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  )
}

export default DropImages
