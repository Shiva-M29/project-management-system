import React, { use } from 'react'; 
import {Form,Input,Button,Radio} from 'antd';
import { useMutation } from '@tanstack/react-query'; 
import {PageWrapper, RegisterCard, Title, SubmitButton} from './Register.styled';
import { useNavigate } from 'react-router-dom';

function registerapi(data) {
  return fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
}).then(response => {
    if (!response.ok) {
        return response.text().then(msg => {
        throw new Error(msg)});
    }
    return response.text();});
}
function Register() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const mutation = useMutation({
        mutationFn: registerapi,
        onSuccess: (data) => {
            navigate('/login');
        }
    });

    const onFinish = (values) => {
    mutation.mutate(values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <PageWrapper>
    <RegisterCard>
    <Title>Register</Title>
     <Form form={form} name="register" layout="vertical" validateTrigger="onSubmit" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ role: 'EMPLOYEE' }}>

<Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' },{ min: 3, message: 'Username must be at least 3 characters' },
    { max: 20, message: 'Username cannot exceed 20 characters' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscore'
    }]}>
  <Input />
</Form.Item>
<Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}>
  <Input type="email" />
</Form.Item>
<Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' },
    { min: 8, message: 'Password must be at least 8 characters' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      message: 'Password must contain at least one letter and one number'
    }]}>
    <Input.Password />
    </Form.Item>

<Form.Item  name="role" rules={[{ required: true, message: 'Please select your role!' }]}>
  
</Form.Item>
<Form.Item label="Register As" name="role">
  <Radio.Group>
    <Radio value="EMPLOYEE">Employee</Radio>
    <Radio value="ADMIN">Admin</Radio>
  </Radio.Group>
</Form.Item>

<Form.Item>
  <Button type="primary" htmlType="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Registering..." : "Register"}
      </Button>
</Form.Item>
{mutation.isError && (<div style={{ color: 'red' }}>{mutation.error.message}</div>
)}
        </Form>
        </RegisterCard>
            </PageWrapper>);
}
export default Register;