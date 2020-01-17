import React from 'react'
import styled from 'styled-components'

import { media } from '../../utils/dimension'

export const Wrapper = styled.div`
    padding-top: 100px;
`
export const Table = styled.table`
    text-align: center;
    width: 100%
    ${media.desktop`
        width: 400px;
        margin-left: 30vw;
    `}
    ${media.laptop`
        width: 400px;
        margin-left: 40vw;
    `}
`
export const TableHeader = styled.tr`
    background: #c3c3c3;
    height: 30px;
`
export const TableContent = styled.tr`
    height: 40px;
`
export const TableContentAccount = styled.td`
    &:hover {
        cursor: pointer;
        background: #f3f3f3;
    }
`

// modal section
export const ModalWrapper = styled.div`
    position: fixed;
    top: ${props => props.isEditModal ? '2%' : '20%' };
    left: 2%;
    padding: 10px;
    width: 90vw;
    border: 1px solid #c3c3c3;
    border-radius: 8px;
    z-index: 30;
    background: #fff;
    ${media.desktop`
        position: fixed;
        top: 10%;
        left: 27%;
        width: 400px;
        padding: 10px 50px;
    `}
    ${media.laptop`
        position: fixed;
        top: 20%;
        left: 35%;
        width: 400px;
        padding: 10px 50px;
    `}
`
export const Background = styled.div`
    z-index: 15;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000040;
`
export const Title = styled.p`
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    ${media.tablet`
        margin-bottom: 30px;
        font-size: 1.17em;
    `}
`
export const InputTitle = styled.p`
    font-size: 12px;
    font-weight: bold;
    margin: 10px 0;
    ${media.tablet`
        margin-bottom: 30px;
        font-size: 14px;
    `}
`
export const Input = styled.input`
    width: 90%;
    height: 30px;
    padding-left: 10px;
    margin-bottom: 10px;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    font-size: 12px;
    &:focus {
        outline: none;
    }
    ${media.desktop`
        margin-bottom: 20px;
        font-size: 14px;
        width: 100%;
    `}
`
export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
`
export const SubmitArea = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
`
export const SubmitButton = styled.button`
    width: 45%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #a94ad8;
    color: white;
    background: #d17ff9;
    font-size: 12px;
    &:hover {
        background: #7f22ad;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
    ${media.tablet`
        font-size: 14px;
    `}
`

export const WhiteButton = styled.button`
    width: 45%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #a94ad8;
    color: #a94ad8;
    background: none;
    font-size: 14px;
    margin-left: 10px;
    &:hover {
        color: #7f22ad;
        border: 1px solid #7f22ad;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`

// for icon general styling
const IconWrapper = ({component: Component, ...props}) => (
    <React.Fragment>
        <Component {...props}/>
    </React.Fragment>
)
export const Icon = styled(IconWrapper)`
    &:hover {
        cursor: pointer;
    }
`