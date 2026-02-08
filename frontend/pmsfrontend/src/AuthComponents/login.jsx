import {Form,Input,Button} from "antd"; 
import {PageWrapper, RegisterCard, Title} from './Register.styled';
import {useNavigate} from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useContext } from "react";
import { useAuth } from "../AuthProvider";
import {toast} from "react-toastify";



 export function loginapi(data) {
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
        return response.json();
    })
}

function Login()
{
        const {login} = useAuth();
    const [form]=Form.useForm();
    const navigate=useNavigate();
    const mutation=useMutation({
    mutationFn: loginapi,
    onSuccess: (data) => {
        login(data);
       const role=data.user.role;
       if(role==="ADMIN")
       {
        navigate("/admin/profile");
       }
       else
        navigate("/employee/profile");
        
    }
, onError: (error) => {
        toast.error('Login failed:'+ error.message);
    }});

    const onFinish=(values)=>{
       mutation.mutate(values);
    }
     return(<PageWrapper>
        <RegisterCard>
        <Title>Login</Title>
    <Form form={form} name="login" layout="vertical" validateTrigger="onChange" onFinish={onFinish}>
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
    </Form>
    </RegisterCard>
    </PageWrapper>);
}
export default Login;