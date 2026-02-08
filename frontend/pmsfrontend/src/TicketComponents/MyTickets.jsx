import { Table, Button, Space, Popconfirm, Spin } from "antd";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { ViewTicketsWrapper } from "./ViewTickets.styled";
import { useNavigate } from "react-router-dom";

function mytickets(token) {
  return fetch("http://localhost:8080/api/tickets/my", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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


function MyTickets() {
  const { token, logout,user } = useAuth();
  const navigate = useNavigate();
   const {data, isLoading, isError, error} = useQuery({
    queryKey: ["my-tickets"],
    queryFn: () => mytickets(token)
});

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
            `/employee/tickets/${record.id}`
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
export default MyTickets;  