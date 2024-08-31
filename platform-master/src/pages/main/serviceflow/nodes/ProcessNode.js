import { useCallback } from "react"
import { Handle, Position } from "reactflow"
import styled from 'styled-components'

const HandleStyle =  styled.div `
  border: 1px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  height: 50px;
  background-color: #2074f6;
  color: white;
  font-size: 12px;
`;

const TextStyle = styled.div`
  text-align: center;
`;

function ProcessNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <HandleStyle onChange={onChange}>
        <TextStyle>{data.label}</TextStyle>
        <Handle type="target" id="1" position={Position.Left} style={{ backgroundColor: 'green' }} />
        <Handle type="target" id="2" position={Position.Top} style={{ backgroundColor: 'green' }} />
        <Handle type="source" id="3" position={Position.Right} style={{ backgroundColor: 'blue' }} />
        <Handle type="source" id="4" position={Position.Bottom} style={{ backgroundColor: 'blue' }} />
      </HandleStyle>
    </>
  )
}

export default ProcessNode
