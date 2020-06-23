import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DropZone = () => {
  // eslint-disable-next-line no-unused-vars
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
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
  )
}

export default DropZone
