import { useCallback } from "react"
import { Handle, Position } from "reactflow"

const handleStyle = {
  border: "1px solid #aaa",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab"
}

function EndNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div style={handleStyle} onChange={onChange}>
        <Handle type="target" position={Position.Left} style={{backgroundColor: 'green', top: "14px" }} />
        <span>End</span>
      </div>
    </>
  )
}

export default EndNode
