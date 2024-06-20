import { useCallback } from "react"
import { Handle, Position } from "reactflow"

const handleStyle = {
  border: "1px solid #aaa",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "grab",
  height: "50px"
}

function MappingNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div style={handleStyle} onChange={onChange}>
        <span>{data.label}</span>
        <Handle type="target" position={Position.Left} style={{ backgroundColor: 'green' }} />
        <Handle type="source" position={Position.Right} style={{ backgroundColor: 'blue' }} />
      </div>
    </>
  )
}

export default MappingNode
