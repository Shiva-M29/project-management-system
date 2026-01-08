import {useState,useEffect,useRef} from "react";
import { Card, Spin, Tag, Divider,Form,Input,Select,Button} from "antd";
import { useParams,useNavigate } from "react-router-dom";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import {fetchEmployees} from "./CreateTicket.jsx";
import { Alert } from "antd";
import { ErrorWrapper } from "../admincomponents/AccountApproval.styled";
import dayjs from "dayjs";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  ViewTicketWrapper,
  TicketCard,
  Field,
} from "./ViewTicket.styled";

export const fetchComments = (ticketId, token,logout) =>
  fetch(`http://localhost:8080/api/comments/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
        return response.json();
      }
  );

  export const addComment = ({ ticketId, content, token,logout}) =>
  fetch(`http://localhost:8080/api/comments/${ticketId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
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
      }
  );

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


export const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write here...",
      });

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
  <div
    style={{
      border: "1px solid #d9d9d9",
      borderRadius: 6,
      minHeight: 120,
    }}
  >
    <div ref={editorRef} />
  </div>
);
;
};

export default function ViewTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, logout,user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  const [comment,setComment]=useState("");
  
  
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
      

      if (!response.ok) {
        if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          logout();
        }, 3000);
      }
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

  const canComment= (data) && (user.role==="ADMIN"||data.assignedTo?.id===user.id);

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

const { data: comments } = useQuery({
  queryKey: ["comments", id],
  queryFn: () => fetchComments(id, token,logout),
});

const commentMutation = useMutation({
  mutationFn: addComment,
  onSuccess: () => {
    queryClient.invalidateQueries(["comments", id]);
     queryClient.invalidateQueries({ queryKey: ["ticket", id] });
      setComment("");
    toast.success("Comment added");
  },
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
      <TicketCard title={data.title }
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
          <p>{data.description} {console.log(data)}</p>
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

<Card title="Comments">
  {comments?.map(c => (
    <div key={c.id}>
      <strong>{c.author}</strong>
      <small>
        {" • "}
        {dayjs(c.createdAt).format("DD MMM YYYY HH:mm")}
      </small>

      <div
        dangerouslySetInnerHTML={{ __html: c.content }}
      />
      <Divider />
    </div>
  ))}

  {canComment && (
    <>
      <RichTextEditor value={comment} onChange={setComment} />

      <div style={{ marginTop: 8 }}>
        <Button
          type="primary"
          onClick={() => {
            if (!comment || comment === "<p><br></p>") {
              toast.error("Comment cannot be empty");
              return;
            }
            commentMutation.mutate({
              ticketId: id,
              content: comment,
              token,
            });
          }}
        >
          Add Comment
        </Button>
      </div>
    </>
  )}
</Card>


      </TicketCard>
    </ViewTicketWrapper>
  );
}
