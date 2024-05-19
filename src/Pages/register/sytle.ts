import { styled } from "styled-components";
import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";


export const Div = styled.div`
border-radius: 3rem;
overflow: hidden;
box-shadow: 0rem 1rem 4rem 0rem #fee140;
/* margin: 15rem 20rem 0 20rem; */

`
export const DivContent = styled.div`
width: 30rem;

`

export const ColLeft = styled(Col)`
background-image: linear-gradient(to top, #fa709a 0%, #fee140 100%);
overflow: hidden;
color: white;
display: flex;
justify-content: center;
text-align: center;
padding: 6rem 0;
`

export const Logo = styled.div`
width: 11rem;
height: 11rem;
border-radius: 50%;
background-color: white;
padding-top:1rem;
margin:2rem 10rem;
`

export const ColRight = styled(Col)`
/* text-align: center; */
padding: 3rem;

`
export const ButtonIn = styled.button`
width: 20rem;
height: 3rem;
border-radius: 1rem;
border: none;
color: white;
font-weight: 600;
background-image: linear-gradient(to top, #fa709a 0%, #fee140 100%);

`

export const FormIn = styled(Form)`

`