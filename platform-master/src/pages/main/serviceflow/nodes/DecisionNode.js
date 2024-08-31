import { useCallback } from "react"
import { Handle, Position } from "reactflow"
import styled from 'styled-components';

const HandleStyle = styled.div`
    width: 35px;
    height: 35px;
    border: 1px solid;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    transform: rotate(-45deg);
    transform-origin: 0 100%;
    background-color: yellow;
    color: black;
`;

const TextStyle = styled.div`
    margin-left: 10px;
    margin-top: 5px;
`;

function DecisionNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <HandleStyle onChange={onChange}>
        <TextStyle>{data.label}</TextStyle>
        <Handle type="target" id="1" position={Position.Left} style={{ backgroundColor: 'green', top: '-1px' }} />
        <Handle type="target" id="2" position={Position.Top} style={{ backgroundColor: 'green', left: '34px' }} />
        <Handle type="source" id="3" position={Position.Right} style={{ backgroundColor: 'blue', top: '34px' }} />
        <Handle type="source" id="4" position={Position.Bottom} style={{ backgroundColor: 'blue', left: '-1px'  }} />
      </HandleStyle>
    </>
  )
}

export default DecisionNode
