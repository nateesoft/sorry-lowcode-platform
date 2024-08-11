import { useCallback } from "react"
import { Handle, Position } from "reactflow"
import styled from 'styled-components'

const HandleStyle =  styled.div `
  width: 50px;
  height: 50px;
  border: 1px solid;
  float: left;
  border-radius: 50%;
  shape-outside: circle(50%);
  background-color: #051ef3;
  color: white;
  font-size: 12px;
`;

const TextStyle = styled.div`
  text-align: center;
  margin-top: 30%;
`;

function StartNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <HandleStyle onChange={onChange}>
        <TextStyle>Start</TextStyle>
        <Handle type="source" id="1" position={Position.Right} style={{ backgroundColor: 'blue', left: '46px' }} />
      </HandleStyle>
    </>
  )
}

export default StartNode
