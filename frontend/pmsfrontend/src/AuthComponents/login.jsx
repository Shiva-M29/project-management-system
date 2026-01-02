import {Form,Input,Button} from "antd"; 
import {PageWrapper, RegisterCard, Title} from './Register.styled';
import { useMutation } from '@tanstack/react-query';


let localStorage = window.localStorage;

 function loginapi(data) {
    return fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response =>{
        if(!response.ok)
        {
            return response.text().then(msg=>{
                throw new Error(msg);})
        }
        return response.text();
    })
}

function Login()
{
    const [form]=Form.useForm();
    const mutation=useMutation({
    mutationFn: loginapi,
    onSuccess: (data) => {
        localStorage.setItem('token', data);
        console.log(data);
    }
, onError: (error) => {
        console.error('Login failed:', error.message);
    }});

    const onFinish=(values)=>{
       mutation.mutate(values);
    }
     return(<PageWrapper>
        <RegisterCard>
        <Title>Login</Title>
    <Form form={form} name="login" layout="vertical" validateTrigger="onSubmit" onFinish={onFinish}>
<Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
  <Input />
</Form.Item>
<Form.Item label="password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
    <Input.Password />
    </Form.Item>
<Form.Item>
  <Button type="primary" htmlType="submit">
    Login
  </Button>
</Form.Item>
{mutation.isError && <div style={{ color: 'red' }}>{mutation.error.message}</div>}
    </Form>
    </RegisterCard>
    </PageWrapper>);
}
export default Login;