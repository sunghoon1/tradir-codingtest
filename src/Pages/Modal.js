import React from 'react';
import styled from 'styled-components';

const w = window.screen.width;
const h = window.screen.height;
const popX = (w/2) - 280;
const popY = (h/2) + 80;

const OVERLAY_STYLES = styled.div`
    position: fixed;
    overflow-y: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1500;
`;

const MODAL_STYLES = styled.div`
    text-align: center;
    position: fixed;
    top: ${popX}px;
    left: ${popY}px;
    fransform: translate(-50%, -50%);
    background: #fff;
    z-index: 1500;
    width: 300px;
    margin: -200px 0px 0px -150px;
    border-radius: 6px;
`;
    
const ModalStyle = styled.div`
    .title {
        padding: 5px 0 5px;
        background: #ff6b6b;
        font-size: 24px;
        font-weight: bold;
        border-radius: 6px 6px 0 0;
        margin-bottom: 20px;
    }

    .price {
        margin: 0 auto;
        .de {
            margin-bottom: 15px;
            img {
                width: 20%;
                height: 120px;
            }
        }
        .des {
            width: 80%;
            text-align: left;
            margin: 0 auto;
        }
    }

    .footer {
        padding: 5px 0 5px;
        cursor: pointer;
        background: #ff6b6b;
        border-radius: 0 0 6px 6px;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
    }
`;

export default function Modal({ open, onClose, send }) {
    if (!open) return null;

    return (
        <>
            <OVERLAY_STYLES />
            <MODAL_STYLES>
                <ModalStyle>
                    <div className='title'>NAME : {send.name}</div>
                    <div className='price'>
                        
                            <div className='de'><img src={send.image_url} alt={send.name}/></div>
                            <div className='des'>abv : {send.abv}</div>
                            <div className='des'>attenuation_level : {send.attenuation_level}</div>
                            <div className='des'>first_brewed : {send.first_brewed}</div>
                            <div className='des'>ph : {send.ph}</div>
                    </div>
                    <div className='footer' onClick={onClose}>닫기</div>
                </ModalStyle>
            </MODAL_STYLES>
        </>
    );
}
