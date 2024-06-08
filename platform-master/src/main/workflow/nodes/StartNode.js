import { useCallback } from "react"
import { Handle, Position } from "reactflow"

const handleStyle = {
  border: "1px solid #1a192b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab",
  height: "80px",
  background: "#213dc4",
  color: "white",
  borderRadius: "50%"
}

function StartNode({ data }) {
  console.log('start node: ', data)
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div style={handleStyle} onChange={onChange}>
        <span>{data.label}</span>
        <Handle type="target" position={Position.Left} style={{ top: 40, backgroundColor: 'green', width: '10px', height: '10px' }} />
        <Handle type="source" position={Position.Bottom} style={{ bottom: -34,backgroundColor: 'blue', width: '10px', height: '10px' }} />
      </div>
    </>
  )
}

export default StartNode
