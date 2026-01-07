import { useMutation, useQuery,useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";
import {useEffect} from "react";
import { Spin, Alert } from "antd";
import { PageWrapper, ApprovalCard, UserRow, UserInfo, Actions,ViewButton,DeleteButton,LoadingText,LoadingWrapper,ErrorWrapper} from './AccountApproval.styled';

function fetchUsers({token,logout}) {
    return fetch('http://localhost:8080/admin/users', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            if (response.status === 401) {  
                toast.error("Session expired. Please login again.");
                setTimeout(() => {
                    logout();
                }, 3000);
            }
            return response.text().then(msg => {
                throw new Error(msg);
            });
        }
        return response.json();
    });
}
function deleteUser({username, token, logout}) {
    return fetch(`http://localhost:8080/admin/delete/${username}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(response=>
    {
         if (!response.ok) {
            if (response.status === 401) {  
                toast.error("Session expired. Please login again.");
                setTimeout(() => {
                    logout();
                }, 3000);
            }
            if(response.status===403)
                throw new Error("delete tickets assigned to "+username+" to delete "+username);
            return response.text().then(msg => {
                throw new Error(msg);
            });
        }
        return response.text();
    }
    )
}
           
function UserManagement() {
    const { token, logout,user } = useAuth();
    const allowed = (user.role === "ADMIN");
    const queryClient=useQueryClient();
    const navigate=useNavigate();
    useEffect(() => {
      if (!allowed) {
        toast.error("You cannot create ticket");
        return navigate("/");
      }
    }, [allowed]);
    

    
    const { data, isLoading, error } = useQuery({
        queryKey:['users'], 
        queryFn:() => fetchUsers({token, logout})
    });
  const deleteMutation=useMutation({
    mutationFn : deleteUser,
        onSuccess : () => {
          toast.success("User deleted");
          queryClient.invalidateQueries(['users']);
        },
        onError: (error) => {
          toast.error("Delete Failed: " + error.message);
        }
 } );
  

  
if (isLoading) {
        return (
    <LoadingWrapper>
      <Spin size="large" />
      <LoadingText>Loading Users...</LoadingText>
    </LoadingWrapper>
  );
    }
    if (error) {
        return (
    <ErrorWrapper>
      <Alert
        message="Failed to load data"
        description={error.message}
        type="error"
        showIcon
      />
    </ErrorWrapper>
  );
    }
    return (
        <PageWrapper>
    <ApprovalCard title="Users Management">
     {data.map((account) =>(
          <UserRow key={account.id}>
            <UserInfo>
              <span>{account.username}</span>
              <span>{account.email}</span>
            </UserInfo>

            <Actions>
              <ViewButton size="small" onClick={() => navigate(`/admin/profile/${account.id}`)}>View</ViewButton>

              {account.role==="EMPLOYEE" && 
              <DeleteButton size="small" onClick={()=>deleteMutation.mutate({username: account.username,token,logout})}>Delete</DeleteButton>
}
            </Actions>
          </UserRow>
     )
        )}
    </ApprovalCard>
  </PageWrapper>
    );

}
export default UserManagement;