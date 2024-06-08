import { useCallback } from "react"
// import { Handle, Position } from "reactflow"

function MessageNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div align="center">
    <span style={{fontSize: '12px'}}>{data.label}</span>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab"
        }}
      >
        <img src="images/message.png" alt="" onChange={onChange} />
      </div>
      {/* <Handle type="target" position={Position.Top} /> */}
      {/* <Handle type="source" position={Position.Bottom} style={{bottom: "-30px"}} /> */}
    </div>
  )
}

export default MessageNode
