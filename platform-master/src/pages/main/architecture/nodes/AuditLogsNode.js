import { useCallback } from "react"

function AuditLogsNode({ data }) {
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
        <img src="/images/audit_logs.png" alt="" onChange={onChange} />
      </div>
    </>
  )
}

export default AuditLogsNode
