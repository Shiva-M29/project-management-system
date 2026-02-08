import { toast } from "react-toastify";
import {useAuth} from "../AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useMutation,useQuery } from "@tanstack/react-query";
import { Form ,Input,Select,Button} from "antd";
import {PageWrapper, RegisterCard, Title, SubmitButton} from '../AuthComponents/Register.styled';
const { TextArea } = Input;
 export function fetchEmployees(token, logout) {
    return fetch("http://localhost:8080/admin/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        toast.error("Session expired");
            setTimeout(() => {
                logout();
            }, 3000);
      }
      if (!response.ok) {
        throw new Error("Failed to load employees");
      }
      return response.json();
    });
  }

function createTicket({token, ticketData, logout}) {
    return fetch('http://localhost:8080/api/tickets', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    }).then(response => {
        if(response.status === 401) {
            toast.error("Session expired. Please login again.");
            setTimeout(() => {
                logout();
            }, 3000);
        }
        if (!response.ok) {
            return response.text().then(msg => {
                throw new Error(msg);
            });
        }
        return response.text();
    });
}

function CreateTicket() {
    const navigate=useNavigate();
    const {token,logout,user} = useAuth();
const allowed = (user.role === "ADMIN");
useEffect(() => {
  if (!allowed) {
    toast.error("You cannot create ticket");
    return navigate("/");
  }
}, [allowed]);


    const [form]=Form.useForm();
    const mutation = useMutation({
        mutationFn:createTicket,
        onSuccess: (data) => {
            toast.success(data);
            navigate("/admin")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(token, logout),
    retry: false,
  });

    const onFinish = (values) => {
        mutation.mutate({
      token,
      ticketData: values,
      logout,
    });
    }

    return (
        <PageWrapper>
       <RegisterCard>
      <Title>Create Ticket</Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true }]}
          >
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={mutation.isPending}
              block
            >
              {mutation.isPending ? "Creating..." : "Create Ticket"}
            </Button>
          </Form.Item>
        </Form>
      </RegisterCard>
    </PageWrapper>);

}


export default CreateTicket;