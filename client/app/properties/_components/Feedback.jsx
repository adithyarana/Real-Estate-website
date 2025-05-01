import React from 'react'

const Feedback = () => {
  return (
    <div>
    <h3 className="text-2xl font-semibold">
      Have any feedback or suggestions for us?{" "}
    </h3>
    <ReactStars
      count={5}
      onChange={() => {}}
      size={24}
      color2={"#ffd700"}
    />
  </div>
  )
}

export default Feedback