import React from 'react'
import { LoginForm } from './components/form/form';
import { useLogin } from '../../../hooks/use-login';


export const LoginScreen: React.FC = () => {

  const { 
    form,
    loading,
    handleLogin
  } = useLogin(); 

  return (
    <React.Fragment>
        <LoginForm 
          form={form}
          loading={loading}
          handleLogin={handleLogin} 
        />
    </React.Fragment>
  )
};
