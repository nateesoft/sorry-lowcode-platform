import { useCallback } from "react"

function FrontendNode({ data }) {
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
        <img src="/images/frontend.png" alt="" onChange={onChange} />
      </div>
    </div>
  )
}

export default FrontendNode
