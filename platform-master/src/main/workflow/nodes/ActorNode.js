import { useCallback } from "react"
import { Handle, Position } from "reactflow"

function ActorNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab"
        }}
      >
        <img src="/images/actor.png" alt="" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Right} style={{backgroundColor: 'blue', width: '10px', height: '10px'}} />
    </>
  )
}

export default ActorNode
