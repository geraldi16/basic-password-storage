import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 75px;
    width: 100%;
    position: fixed;
    background-color: #a94ad8;
    box-shadow: 0 1px 6px #00000060;
    top: 0;
    z-index: 10;
`
export const Button = styled.button`
    float: right;
    color: white;
    font-size: 14px;
    background: #a94ad8;
    border: none;
    height: 100%;
    width: 150px;
    &:hover {
        background: #7f22ad;
        cursor: pointer;
    }
    &:focus {
        outline: none;
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