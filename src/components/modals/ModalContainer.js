import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModalState, ModalStateAction, ModalContext } from '../../State/ModalStateProvider'

var ModalContainer = () => {
    const [modalModel] = useModalState();

    useEffect(()=>{
        console.log(modalModel);
    }, [modalModel])

    return <Modal isVisible={modalModel.isVisible}/>
}

export default ModalContainer
