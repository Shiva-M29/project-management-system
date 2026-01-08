import {
  Table,
  Button,
  Space,
  Spin,
  Popconfirm,
} from "antd";
import { use, useEffect } from "react";
import { useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import { ViewTicketsWrapper } from "./ViewTickets.styled";

function handleDelete2({id,token,logout}) {
  return fetch(`http://localhost:8080/api/tickets/${id}`, {
    method: "DELETE",
    headers: { 
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

    return response.text();
  });
}

export default function ViewTickets() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, logout,user } = useAuth();
 const allowed = user.role === "ADMIN" || user.role === "EMPLOYEE";
useEffect(() => {
  if (!allowed) {
    toast.error("You are not allowed to view tickets");
    return navigate("/");
  }
}, [allowed]);


  const deleteMutation=useMutation({
    mutationFn: handleDelete2,
    onSuccess: () => {
      toast.success("Ticket Deleted");
      queryClient.invalidateQueries(['tickets']);
    },
    onError: (error) => {
      toast.error("Delete Failed: " + error.message);
    }
  });

  const fetchTickets = () => {
    return fetch("http://localhost:8080/api/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          logout();
        }, 3000); 
      }

      if(!response.ok) {
        return response.text().then((msg) => {
          throw new Error(msg);
        });
      }
      return response.json();
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });

  const handleDelete = (id) => {
    toast.info("Delete API not connected yet");
    console.log("Delete ticket:", id);
  };



  const columns = [
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Assigned To",
      dataIndex: ["assignedTo", "username"]
    },
    {
      title: "Created By",
      dataIndex: ["createdBy", "username"]
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() =>
              navigate(
  user.role === "ADMIN"
    ? `/admin/tickets/${record.id}`
    : `/employee/tickets/${record.id}`
)

            }
          >
            View/Update
          </Button>

          {user?.role === "ADMIN" && (
          <Popconfirm
            title="Delete ticket?"
            onConfirm={() => deleteMutation.mutate({id:record.id,token,logout})}
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  


  if (isLoading) return <Spin size="large" />;

 if (isError) {
     return toast.error(error.message);
  }


  return (
    <ViewTicketsWrapper>
      <Table
        columns={columns}
         dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 8 }}  
      />
    </ViewTicketsWrapper>
  );
}
