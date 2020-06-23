/* eslint-disable import/no-unresolved */
import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'

const fileTarget = {
  drop(props, monitor) {
    // eslint-disable-next-line no-console
    console.log(monitor.getItem().files)
  }
}

function FileDropZone({ connectDropTarget, isOver, canDrop }) {
  return connectDropTarget(
    <div>
      {!isOver && !canDrop && 'Drag files from the hard drive'}
      {!isOver && canDrop && 'Drag the files here'}
      {isOver && 'Drop the files'}
    </div>
  )
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileDropZone)
