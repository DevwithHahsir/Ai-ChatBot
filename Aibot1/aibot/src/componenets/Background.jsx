import Orb from './Orb';
import "../cssFiles/Background.css"

import React from 'react'

function Background() {
  return (
    <div className="background-container">
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />
    </div>
  )
}

export default Background
