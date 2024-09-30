import React, { useState } from "react"
import { Button, Collapse } from "@mui/material"

export const ShowMoreLess = ({ className, children }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className={className}>
      <Collapse in={showMore}>{children}</Collapse>
      <Button
        size="small"
        onClick={() => {
          setShowMore(oldState => !oldState)
        }}
      >
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </div>
  )
}
