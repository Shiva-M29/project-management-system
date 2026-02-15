import {useAuth} from "../AuthProvider";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Space, Popconfirm, Spin } from "antd";
import { ViewTicketsWrapper } from "./ViewTickets.styled";
import { DeleteButton, ViewButton } from "../admincomponents/AccountApproval.styled";
import { TableHeader } from "../TableHeader.styled";

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

export default function PRTickets() {
    const navigate = useNavigate(); 
    const { token, logout,user } = useAuth();
    const queryClient = useQueryClient();
     const allowed = user.role === "ADMIN" ;
    useEffect(() => {
      if (!allowed) {
        toast.error("You are not allowed to view PR tickets");
        return navigate("/");
      }
    }, [allowed]);


    const fetchPRTickets = () => {
    return fetch("http://localhost:8080/api/tickets/pr", {
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
    queryKey: ["PRtickets"],
    queryFn: fetchPRTickets,
  });
    const deleteMutation=useMutation({
      mutationFn: handleDelete2,
      onSuccess: () => {
        toast.success("Ticket Deleted");
        queryClient.invalidateQueries(['PRtickets']);
      },
      onError: (error) => {
        toast.error("Delete Failed: " + error.message);
      }
    });

    const columns = [
    {
      title: <TableHeader>TITLE</TableHeader>,
        dataIndex: "title"
    },
    {
      title: <TableHeader>STATUS</TableHeader>,
        dataIndex: "status"
    },
    {
      title: <TableHeader>ASSIGNED TO</TableHeader>,
        dataIndex: ["assignedTo", "username"]
    },
    {
      title: <TableHeader>CREATED BY</TableHeader>,
        dataIndex: ["createdBy", "username"]
    }
    ,
    {
      title: <TableHeader>ACTIONS</TableHeader>,
      key: "actions",
      render: (_, record) => (
        <Space>
          <ViewButton
            size="small"
            onClick={() =>
              navigate( `/admin/tickets/${record.id}`)

            }
          >
            View/Update
          </ViewButton>

          {user?.role === "ADMIN" && (
          <Popconfirm
            title="Delete ticket?"
            onConfirm={() => deleteMutation.mutate({id:record.id,token,logout})}
          >
            <DeleteButton size="small" danger>
              Delete
            </DeleteButton>
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