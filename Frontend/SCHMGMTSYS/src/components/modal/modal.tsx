import React from 'react'
import { CustomModalProps } from './props/modal-props'
import { Button, Modal } from 'antd'
import { useModal } from '../../hooks/use-modal'

export const CustomModal: React.FC<CustomModalProps> = ({ open, title, onOk, onCancel, children, centered }) => {

  const { form } = useModal();

  const handleSubmit = () => {
    onOk(); 
    form.submit(); 
  };

  return (
    <Modal
        title={title}
        open={open}
        onOk={handleSubmit}
        onCancel={onCancel}
        footer={[
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Confirm
            </Button>,
        ]}
        centered={centered}
        maskClosable={false}  
    >   
        {children}
    </Modal>
  )
}
