import React from "react"
import Loader from "../Loader"

const PageLoader = () => {
  return (
    <div
      style={{
        height: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Loader />
    </div>
  )
}

export default PageLoader
