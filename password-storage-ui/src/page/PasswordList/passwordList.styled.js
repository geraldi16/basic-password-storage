import React from 'react'

import styled from 'styled-components'

export const Wrapper = styled.div`
    padding-top: 15vh;
`
export const Table = styled.table`
    width: 400px;
    text-align: center;
    margin-left: 40vw;
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
export const ModalWrapper = styled.form`
    position: fixed;
    top: 20%;
    left: 35%;
    border: 1px solid #c3c3c3;
    border-radius: 8px;
    z-index: 30;
    background: #fff;
    padding: 10px 50px;
    width: 400px;
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
export const Title = styled.h3`
    margin-bottom: 30px;
`
export const InputTitle = styled.p`
    font-size: 14px;
    font-weight: bold;
`
export const Input = styled.input`
    width: 100%;
    height: 30px;
    padding-left: 10px;
    margin-bottom: 20px;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    font-size: 14px;

    &:focus {
        outline: none;
    }
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
    font-size: 14px;
    &:hover {
        background: #7f22ad;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
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