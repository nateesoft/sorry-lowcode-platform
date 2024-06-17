import { useCallback } from "react"
import { Handle, Position } from "reactflow"

const handleStyle = {
  border: "1px solid #1a192b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab",
  height: "80px",
  background: "#d11329",
  color: "white",
  borderRadius: "50%"
}

function EndNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div style={handleStyle} onChange={onChange}>
        <Handle type="target" position={Position.Top} style={{backgroundColor: 'green', width: '10px', height: '10px'}} />
        <span>End</span>
      </div>
    </>
  )
}

export default EndNode
