import { useCallback } from "react"
import { Handle, Position } from "reactflow"
import styled from 'styled-components'

const HandleStyle =  styled.div `
  width: 50px;
  height: 50px;
  border: 1px solid;
  background-color: snow;
  float: left;
  border-radius: 50%;
  shape-outside: circle(50%);
  background-color: #b00b06;
  color: white;
  font-size: 12px;
`;

const TextStyle = styled.div`
    text-align: center;
    margin-top: 30%;
`;

function EndNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <HandleStyle onChange={onChange}>
        <Handle type="target" id="1" position={Position.Left} style={{backgroundColor: 'green', top: "22px" }} />
        <TextStyle>End</TextStyle>
      </HandleStyle>
    </>
  )
}

export default EndNode
