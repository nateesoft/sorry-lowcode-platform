import { useCallback } from "react"
import { Handle, Position } from "reactflow"

function PageNode({ data }) {
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
          cursor: "grab",
          border: "1px solid #bbb",
          borderRadius: '5px'
        }}
      >
        <img src="/images/pages.png" alt="" onChange={onChange} />
      </div>
      <Handle type="target" position={Position.Top} style={{backgroundColor: 'green', width: '10px', height: '10px'}} />
      <Handle type="source" position={Position.Bottom} style={{bottom: "-30px", backgroundColor: 'blue', width: '10px', height: '10px'}} />
    </div>
  )
}

export default PageNode
