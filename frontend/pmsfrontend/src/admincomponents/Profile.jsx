import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import { Form, Input, Modal, Tag,Avatar } from "antd";

import {
  ProfileWrapper,
  ProfileCard,
  Header,
  UserInfo,
  Section,
  Row,
  Label,
  Value,
  EditButton,
} from "./Profile.styled";

function getUserForAdmin({userId,token,logout})
{
 return fetch(`http://localhost:8080/admin/users/${userId}`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        }).then(res=>{
            if(!res.ok){
                if(res.status===401){
                    toast.error("Session expired. Please log in again.");
                    setTimeout(()=>{
                        logout();
                    },1000);
                }
                return res.text().then(text=>{
                    throw new Error(text || 'Failed to fetch user profile');
                })
            }
            return res.json();
        })
}
function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ckjkjbk"); 

  return fetch(
    "https://api.cloudinary.com/v1_1/dssoza4nz/image/upload",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error("Cloudinary upload failed: " + text);
        });
      }
      return response.json();
    })
    .then((data) => data.secure_url); 
}



 function getUser({token,logout}){
        return fetch('http://localhost:8080/api/users/me',{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        }).then(res=>{
            if(!res.ok){
                if(res.status===401){
                    toast.error("Session expired. Please log in again.");
                    setTimeout(()=>{
                        logout();
                    },1000);
                }
                return res.text().then(text=>{
                    throw new Error(text || 'Failed to fetch user profile');
                })
            }
            return res.json();
        })
    }
  function  updateUserByAdmin({username,updatedData,token,logout})
  {
    console.log(username);
    return fetch(`http://localhost:8080/api/users/adminupdate/${username}`,{
            method:'PATCH',
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updatedData)
        }).then(res=>{
            if(!res.ok){
                if(res.status===401){
                    toast.error("Session expired. Please log in again.");
                    setTimeout(()=>{
                        logout();
                    },1000);
                }
                return res.text().then(text=>{
                    throw new Error(text);
                })
            }
            return res.text();
        })

  }
    function updateUser({updatedData,token,logout}){
          
        return fetch(`http://localhost:8080/api/users`,{
            method:'PATCH',
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updatedData)
        }).then(res=>{
            if(!res.ok){
                if(res.status===401){
                    toast.error("Session expired. Please log in again.");
                    setTimeout(()=>{
                        logout();
                    },1000);
                }
                return res.text().then(text=>{
                    throw new Error(text);
                })
            }
            return res.text();
        })
    }

function Profile() {
  const queryClient=useQueryClient();
  const [form]=Form.useForm();
  const navigate=useNavigate();
  const {userId}=useParams();
  const isAdminView = Boolean(userId);
const [image,setImage]=useState("");
    const {token,logout,user,login}=useAuth();
    const [open,setOpen]=useState(false);
    const [field,setField]=useState(null);
    const allowed = user.role === "ADMIN" || user.role === "EMPLOYEE";
    useEffect(() => {
      if (!allowed) {
        toast.error("You are not allowed to view profile");
        return navigate("/");
      }
    }, [allowed]);
   
          
    const {data,error,isError,isLoading}=useQuery(
        {
              queryKey: isAdminView ? ["profile", userId] : ["profile"],
            queryFn: ()=>isAdminView
      ? getUserForAdmin({ userId, token, logout })
      : getUser({ token, logout }),

        }
    )
const openEditModal = (fieldName) => {
  setField(fieldName);
  form.setFieldsValue({ [fieldName]: data[fieldName] });
  setOpen(true);
};

    const mutation=useMutation({
        mutationFn: (payload) => {
  if (isAdminView) {
    return updateUserByAdmin(payload);
  }
  return updateUser(payload);
},
        onSuccess: () => {  
const requiresRelogin =
    !isAdminView && (field === "username" || field === "password");
      if (requiresRelogin) {
        toast.info("Please log in again with your new credentials");
        setTimeout(() => {
          logout();
        }, 1500);
             }
    else {
            toast.success("Profile updated successfully");
            isAdminView
  ? queryClient.invalidateQueries({ queryKey: ['profile', userId] })
  : queryClient.invalidateQueries({ queryKey: ['profile'] });
    }

            setOpen(false);
            form.resetFields();
             
        },
        onError: (error) => {
            toast.error(`Failed to update profile: ${error.message}`);
        },
    });
    if(isLoading){
        return <div>Loading...</div>;
    }
    if(isError){
        return <div>Error: {error.message}</div>;
    } 
    return (<ProfileWrapper>
        <ProfileCard title= {isAdminView?` ${data.username} Profile`:"My Profile"}>
            <Header>
      <Avatar size={120} src={data.displayPicture}>
        {data.username?.charAt(0).toUpperCase()}
      </Avatar>
<UserInfo>
        <h2>{data.username}</h2>
        <span>{data.email}</span>
        <div style={{ marginTop: 8 }}>
          <Tag color="blue">{data.role}</Tag>
          <Tag color="green">{data.status}</Tag>
        </div>
      </UserInfo>
    </Header>

    
        <Section>
            {data.username === user.username && (
                <>
      <Row>
        <Label>Username</Label>
        <Value>{data.username}</Value>
        <EditButton type="link" onClick={() => openEditModal("username")}>
          Edit
        </EditButton>
      </Row>

      

      <Row>
        <Label>Bio</Label>
        <Value>{data.bio || "N/A"}</Value>
        <EditButton type="link" onClick={() => openEditModal("bio")}>
          Edit
        </EditButton>
      </Row>

      <Row>
        <Label>Profile Picture</Label>
        <Value>Image URL</Value>
        <EditButton type="link" onClick={() => openEditModal("displayPicture")}>
          Update
        </EditButton>
      </Row>

      </>
      )}
      <Row>
        <Label>Password</Label>
        <Value>********</Value>
        <EditButton type="link" onClick={() => openEditModal("password")}>
          Change
        </EditButton>
      </Row>
    </Section>

            

    
    <Modal
      open={open}
      title={`Update ${field}`}
      onCancel={() => setOpen(false)}
      onOk={() => form.submit() }
    confirmLoading={mutation.isPending}

    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(updatedData)=>{
          if (field === "displayPicture") {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    uploadToCloudinary(image)
      .then((imageUrl) => {
       const updatedData = { displayPicture: imageUrl };

        mutation.mutate({
          username: data.username,
          updatedData,
          token,
          logout,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });

    return; 
  }

  
  mutation.mutate({
    username: data.username,
    updatedData,
    token,
    logout,
  });
          
        }}
        validateTrigger="onSubmit"
        onFinishFailed={()=>setTimeout(()=>form.resetFields(), 1000)}
      >
        {field === "password" && (
          <Form.Item label="Password" name="password"  rules={[{ required: true, message: 'Please input your password!' },
    { min: 8, message: 'Password must be at least 8 characters' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      message: 'Password must contain at least one letter and one number'
    }]}>
    <Input.Password />
    </Form.Item>
        )}

        {field === "username" && (
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' },{ min: 3, message: 'Username must be at least 3 characters' },
    { max: 20, message: 'Username cannot exceed 20 characters' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscore'
    }]}>
  <Input />
</Form.Item>
        )}

        {field === "bio" && (
          <Form.Item
            label="Bio"
            name="bio"
            rules={[
              { max: 300, message: "Bio must be under 300 characters" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        )}

        {field === "displayPicture" && (
          
          <Form.Item label="Profile Picture">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />
</Form.Item>

)}
 
      </Form>
    </Modal>
        
  </ProfileCard>
</ProfileWrapper>
    );

}

export default Profile;