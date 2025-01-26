import React, { useState } from 'react'

const Draggable = ({ children, className, initialCoordinates}) => {
  
    const [position, setPosition] = useState(initialCoordinates)
    const [isDragging, setIsDragging] = useState(false)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setOffset({x: e.clientX - position.x,y: e.clientY - position.y})
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        setPosition({x: e.clientX - offset.x,y: e.clientY - offset.y})
    }

    return <div
        style={{top: position.y, left: position.x, cursor: isDragging ? 'grabbing' : 'grab' }} 
        className={`draggable ${className}`} 
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp={() => {setIsDragging(false)}}>
            {children}
    </div>
}

export default Draggable
