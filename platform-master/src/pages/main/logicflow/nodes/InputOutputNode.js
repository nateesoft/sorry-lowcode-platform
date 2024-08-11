import { useCallback } from "react"
import { Handle, Position } from "reactflow"
import styled from 'styled-components'

const HandleStyle =  styled.div `
  width: 100px;
  height: 50px;
  transform: skew(20deg);
  background-color: snow;
  border: 1px solid;
  background-color: #eee;
  color: black;
  font-size: 12px;
`;

const TextStyle = styled.div`
  text-align: center;
  margin-top: 10%;
`;

function InputOutputNode({ data }) {
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

export default InputOutputNode
