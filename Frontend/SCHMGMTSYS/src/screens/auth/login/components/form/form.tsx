import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormInstance, Input } from 'antd';
import { Link } from 'react-router-dom';
import { LoginFormContainer, LoginMainContainer } from '../../themes/login-themes';
import { onFinishFailed } from '../../../../teacher/context/exception/finish-failed';

export const LoginForm = (
    form: FormInstance,
    handleLogin: () => void,
    loading: boolean
) => {
    return (
        <LoginMainContainer>
            <Form
                style={{ 
                    maxWidth: 500, 
                    ...LoginFormContainer 
                }}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                {/* <div className="image-container">
                    <img src={Logo} alt="eVotery-logo" />
                </div> */}
                
                <h1 className="title-label">LOGIN</h1>

                {/* {
                    errorField && (
                        <Alert 
                            className="alert-container"
                            message={errorField}
                            type="error"
                        />
                    )
                } */}

                <Form.Item
                    name="voterIdOrEmail"
                    rules={[{ 
                        required: true, 
                        message: 'Please input your Voter ID or Email.' 
                    }]}
                >
                    <Input 
                        size='large' 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Voter's ID or Email" 
                    />
                </Form.Item>
                
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password.' }]}
                >
                    <Input.Password
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item>
                    <div className="form-remember-forgot">
                        <Form.Item noStyle>
                            <Checkbox className='title-remember'>Remember me</Checkbox>
                        </Form.Item>

                        <Link to={'/reset-password'}>
                            <div className="login-form-forgot">
                                Forgot password
                            </div>
                        </Link>
                    </div>
                </Form.Item>

                <Form.Item>
                    <div className="login-register-container">
                        <div className="login-button-container">
                            <Button 
                                size='large'
                                type="primary" 
                                htmlType="submit" 
                                className="login-form-button"
                                loading={loading}
                            >
                                Log in
                            </Button>
                        </div>
                        
                        <div className="register-button-container">
                            <span className='title-no-account'>No account?</span>
                            
                            <Link to={'/register-page'}>
                                <div className='register-title'>Register now!</div>
                            </Link>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </LoginMainContainer>
    )
};