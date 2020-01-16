import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 75px;
    width: 100%;
    position: fixed;
    background-color: #a94ad8;
    box-shadow: 0 0 6px #00000020;
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