import React, { useRef, useState } from 'react';
import styled from 'styled-components';
const Aa=styled.div`
ul{


  :hover{
  border: 1px solid red;
}

}
`;
export default function Test4() {

  return (
    <Aa>
            <ul>
              <li>
                {123}<br></br>
                {123}<br></br>
                {123}
              </li>
              <li>
                {123}<br></br>
                {123}<br></br>
                {123}
              </li>
            </ul>
    </Aa>
  );
}