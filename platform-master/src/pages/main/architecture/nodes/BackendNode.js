import { useCallback } from "react"

function BackendNode({ data }) {
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
          borderRadius: '5px'
        }}
      >
        <img src="/images/backend.png" alt="" onChange={onChange} />
      </div>
    </div>
  )
}

export default BackendNode
