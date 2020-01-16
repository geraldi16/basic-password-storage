import styled from 'styled-components'

import { media } from '../../utils/dimension'

export const Wrapper = styled.form`
    ${media.desktop`
        position: fixed;
        top: 20%;
        left: 25%;
        border: 1px solid #c3c3c3;
        border-radius: 8px;
    `}
    ${media.laptopXL`
        top: 20%;
        left: 30%;
    `}
    padding: 30px 50px;
`
export const Title = styled.h1`
    margin-bottom: 50px;
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
export const Border = styled.div`
    font-size: 12px;
    border-bottom: 1px solid #c3c3c3;
    padding-bottom: 10px;
    margin: 20px 0;
`