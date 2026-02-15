import {
  Table,
  Button,
  Space,
  Spin,
  Popconfirm,
  Select
} from "antd";
import { useState, useEffect } from "react";
import { useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import { ViewTicketsWrapper } from "./ViewTickets.styled";
import { ViewButton,DeleteButton } from "../admincomponents/AccountApproval.styled";
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

export default function ViewTickets() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, logout,user } = useAuth();
  const {Option} =Select; 
  const [ticketType, setTicketType] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
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
    let params = new URLSearchParams();

if (ticketType) {
  params.append("ticketType", ticketType);
}

if (ticketStatus) {
  params.append("ticketStatus", ticketStatus);
}

const url = `http://localhost:8080/api/tickets${params.toString() ? "?" + params.toString() : ""}`;
    return fetch(url, {
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
    queryKey: ["tickets", ticketType, ticketStatus],
    queryFn: fetchTickets,
  });

  



  const columns = [
    {
      title: <TableHeader>
        TITLE
     </TableHeader>,
      dataIndex: "title"
    },
    {
      title: <TableHeader>
        STATUS
      </TableHeader>,
      dataIndex: "status"
    },
    {
       title: <TableHeader>
        TYPE
      </TableHeader>,
       dataIndex: "label"
     },
    {
      title: <TableHeader >
        ASSIGNED TO
      </TableHeader>,
      dataIndex: ["assignedTo", "username"]
    },
    {
      title: <TableHeader>
        CREATED BY
      </TableHeader>,
      dataIndex: ["createdBy", "username"]
    },
    {
      title: <TableHeader >
        ACTIONS
      </TableHeader>,
      key: "actions",
      render: (_, record) => (
        <Space>
          <ViewButton
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
      <Select placeholder={ticketType?ticketType:"Ticket Type"} style={{ width: 150, marginRight: 10 }} onChange={(value) => {
        setTicketType(value);
      }}>
        <Option value={null}>All Tickets</Option>
        <Option value="BUG">Bug</Option>
        <Option value="FEATURE">Feature</Option>
        <Option value="SUPPORT">Support</Option>
        <Option value="TASK">TASK</Option>
        <Option value="IMPROVEMENT">Improvement</Option>
      </Select>
      <Select placeholder={ticketStatus?ticketStatus:"Ticket Status"} style={{ width: 150 }} onChange={(value) => {
        setTicketStatus(value);
      }}>
        <Option value={null}>All Tickets</Option>
        <Option value="TODO">To Do</Option>
        <Option value="IN_PROGRESS">In Progress</Option>
        <Option value="PAUSED">Paused</Option>
        <Option value="PR_REVIEW">PR Review</Option>
        <Option value="READY_TO_DEPLOY">Ready to Deploy</Option>
        <Option value="DEPLOYED">Deployed</Option>
      </Select>
      <Table
        columns={columns}
         dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 8 }}  
      />
    </ViewTicketsWrapper>
  );
}
