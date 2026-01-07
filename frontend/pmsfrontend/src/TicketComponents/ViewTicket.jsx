import {useState,useEffect} from "react";
import { Card, Spin, Tag, Divider,Form,Input,Select,Button} from "antd";
import { useParams,useNavigate } from "react-router-dom";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import {fetchEmployees} from "./CreateTicket.jsx";
import { Alert } from "antd";
import { ErrorWrapper } from "../admincomponents/AccountApproval.styled";
import {
  ViewTicketWrapper,
  TicketCard,
  Field,
} from "./ViewTicket.styled";


function statusUpdate(id, status,logout,token) {
    return fetch(`http://localhost:8080/api/tickets/${id}/status`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(status),
    }).then(response => {
        if (!response.ok) {

            if (response.status === 401) {
                toast.error("Session expired. Please login again.");
                setTimeout(logout, 3000);
            }
            return response.text().then(msg => {
                throw new Error(msg);
            });
        }
        return response.text();
    });
}
function updateTicket(id, ticketData, logout, token) {
    return fetch(`http://localhost:8080/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
    }).then(response => {
        if (!response.ok) {

            if (response.status === 401) {
                toast.error("Session expired. Please login again.");
                setTimeout(logout, 3000);
            }
            return response.text().then(msg => {
                throw new Error(msg);
            });
        }
        return response.text();
    });
}

export default function ViewTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, logout,user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  
    const allowed = user.role === "ADMIN" || user.role === "EMPLOYEE";
useEffect(() => {
  if (!allowed) {
    toast.error("You are not allowed to view ticket");
    return navigate("/");
  }
}, [allowed]);


  const fetchTicket = () => {
    return fetch(`http://localhost:8080/api/tickets/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          logout();
        }, 3000);
      }

      if (!response.ok) {
       return response.text().then((msg) => {
          throw new Error(msg);
        });
      }

      return response.json();
    });
  };

  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["ticket", id],
    queryFn: fetchTicket,
  });

  const { data: employees } = useQuery({
      queryKey: ["employees"],
      queryFn: () => fetchEmployees(token, logout),
       enabled: user?.role === "ADMIN"
    });
const canUpdateStatus = data && (user.role === "ADMIN" || data.assignedTo?.id === user.id);

const statusMutation=useMutation({
    mutationFn:({id,status})=>statusUpdate(id,status,logout,token),
    onSuccess:(data)=>{
         toast.success(data);
        queryClient.invalidateQueries({queryKey:["ticket",id]});
       
    },
    onError:(error)=>{
        toast.error(error.message);
    }
});

const updateMutation=useMutation({
    mutationFn:({id,ticketData})=>updateTicket(id,ticketData,logout,token),
    onSuccess:(data)=>{
         setEditMode(false);
        toast.success(data);
        queryClient.invalidateQueries({queryKey:["ticket",id]});
       
    },
    onError:(error)=>{
        toast.error(error.message);
    }
});

  if (isLoading) return <Spin size="large" />;

  if (isError)  return (
    <ErrorWrapper>
      <Alert
        description={error.message}
        type="error"
        showIcon
      />
    </ErrorWrapper>);

  return (
    <ViewTicketWrapper>
      <TicketCard title={data.title}
      extra={
    user?.role === "ADMIN" && (
      <Button type="primary" onClick={() => setEditMode(true)}>
        Edit
      </Button>
    )
  }>
    {!editMode ? (
        <>
        <Field>
          <span>Description:</span>
          <p>{data.description}</p>
        </Field>

        <Field>
          <span>Label:</span>{" "}
          <Tag color="blue">{data.label}</Tag>
        </Field>

        <Field>
          <span>Status:</span> {data.status}
        </Field>

        <Field>
          <span>Assigned To:</span>{" "}
          {data.assignedTo?.username}
        </Field>

        <Field>
          <span>Created By:</span>{" "}
          {data.createdBy?.username}
        </Field>
        </>

    ):(<Form
  layout="vertical"
  initialValues={{
    title: data.title,
    description: data.description,
    label: data.label,
  }}
  onFinish={(values) => {
    updateMutation.mutate({ id, ticketData: values });
  }}
>
  <Form.Item name="title" label="Title">
    <Input />
  </Form.Item>

  <Form.Item name="description" label="Description">
    <Input.TextArea rows={3} />
  </Form.Item>

  <Form.Item name="label" label="Label">
    <Select
      options={[
        { value: "BUG", label: "🐞 Bug" },
        { value: "FEATURE", label: "✨ Feature" },
        { value: "TASK", label: "📝 Task" },
        { value: "IMPROVEMENT", label: "🚀 Improvement" },
        { value: "SUPPORT", label: "🔧 Support" },
      ]}
    />
  </Form.Item>
  <Form.Item
            label="Assign To"
            name="assignedToUserId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select employee"
              options={employees?.map((u) => ({
                value: u.id,
                label: u.username,
              }))}
            />
          </Form.Item>

  <Button type="primary" htmlType="submit">
    Save
  </Button>

  <Button onClick={() => setEditMode(false)} style={{ marginLeft: 8 }}>
    Cancel
  </Button>
</Form>
)}
  <Divider />

  <Field>
  <span>Change Status:</span>
  <Select
    value={data.status}
    style={{ width: 220 }}
    disabled={!canUpdateStatus}
    onChange={(newStatus) =>
      statusMutation.mutate({ id, status: newStatus })
    }
  >
    {user.role==="ADMIN" && (
        <>
    <Select.Option value="TODO">TODO</Select.Option>
    <Select.Option value="IN_PROGRESS">IN PROGRESS</Select.Option>
    <Select.Option value="PAUSED">PAUSED</Select.Option>
    <Select.Option value="PR_REVIEW">PR REVIEW</Select.Option>
    <Select.Option value="READY_TO_DEPLOY">READY TO DEPLOY</Select.Option>
    <Select.Option value="DEPLOYED">DEPLOYED</Select.Option> </> )}
    {
        user?.role==="EMPLOYEE" && (
            <>
    <Select.Option value="TODO">TODO</Select.Option>
    <Select.Option value="IN_PROGRESS">IN PROGRESS</Select.Option>
    <Select.Option value="PAUSED">PAUSED</Select.Option>
    <Select.Option value="PR_REVIEW">PR REVIEW</Select.Option>
    </>
        )
    }

  </Select>
</Field>
      </TicketCard>
    </ViewTicketWrapper>
  );
}
