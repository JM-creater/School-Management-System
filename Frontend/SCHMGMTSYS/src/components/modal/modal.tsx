import { Modal } from 'antd'
import { useModal } from '../../hooks/use-modal'
import { CustomButton } from '../button';
import { CustomModalProps } from '../../configs/props';

export const CustomModal = (props: CustomModalProps) => {

  const { 
    open, 
    title, 
    onOk, 
    onCancel, 
    children, 
    centered 
  } = props;
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
        <CustomButton 
          key="cancel" 
          onClick={onCancel} 
          label='Cancel'
        />,
        <CustomButton 
          key="submit" 
          onClick={handleSubmit} 
          label='Submit'
          type='primary'
        />
      ]}
      centered={centered}
      maskClosable={false} 
    >   
        {children}
    </Modal>
  )
}
