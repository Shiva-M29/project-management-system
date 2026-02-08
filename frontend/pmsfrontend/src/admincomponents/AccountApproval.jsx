import React from 'react';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { Spin, Alert,notification } from 'antd';
import { PageWrapper, ApprovalCard, UserRow, UserInfo, Actions,ApproveButton,RejectButton,LoadingText,LoadingWrapper,ErrorWrapper} from './AccountApproval.styled';
import {toast} from 'react-toastify';
import { useAuth } from '../AuthProvider';
function fetchPendingAccounts(token,logout) {
    return fetch('http://localhost:8080/admin/pendingusers?status=PENDING', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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
function approveAccount({username,token,logout}) {
    return fetch(`http://localhost:8080/admin/users/${username}/approve`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
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
        return response.text();
    });
}

function rejectAccount({username,token,logout}) {
    return fetch(`http://localhost:8080/admin/users/${username}/reject`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
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
        return response.text();
    });
}

function AccountApproval() {
    const { token, logout } = useAuth();
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({
        queryKey: ['pendingAccounts'],
        queryFn: () => fetchPendingAccounts(token, logout),
    });

    const [isActionInProgress, setIsActionInProgress] = React.useState(false);
    const mutationApprove = useMutation({
        mutationFn: approveAccount,
        onMutate: () => {
            setIsActionInProgress(true);
        },
        onSettled: () => {
            setTimeout(() => {
                setIsActionInProgress(false);
            }, 6500);
            
        },
        onSuccess: () => {
           toast.success("Account Approved");
            queryClient.invalidateQueries(['pendingAccounts']);
        },
        onError: (error) => {
            toast.error("Approval Failed");        }
    });
    const mutationReject = useMutation({
        mutationFn: rejectAccount,
        onMutate: () => {
            setIsActionInProgress(true);
        },
        onSettled: () => {
            setTimeout(() => {
                setIsActionInProgress(false);
            }, 3500);
        },
        onSuccess: () => {
            toast.error("Account Rejected");
            queryClient.invalidateQueries(['pendingAccounts']);
        },
        onError: (error) => {
            toast.error("Rejection Failed");
        }
    });

    

       
    if (isLoading) {
        return (
    <LoadingWrapper>
      <Spin size="large" />
      <LoadingText>Loading pending accounts...</LoadingText>
    </LoadingWrapper>
  );
    }
    if (error) {
        return (
    <ErrorWrapper>
      <Alert
        description={error.message}
        type="info"
        showIcon
      />
    </ErrorWrapper>
  );
    }
    return (
        <PageWrapper>
    <ApprovalCard title="Pending Account Approvals">
     {data?.map((account) =>(
          <UserRow key={account.id}>
            <UserInfo>
              <span>{account.username}</span>
              <span>{account.email}</span>
            </UserInfo>
 {!isActionInProgress &&
            <Actions>
                                <ApproveButton size="small" onClick={() =>{ mutationApprove.mutate({username: account.username, token, logout})}} loading={isActionInProgress} disabled={isActionInProgress}>Approve</ApproveButton>
                                <RejectButton size="small" onClick={() => mutationReject.mutate({username: account.username, token, logout})} loading={isActionInProgress} disabled={isActionInProgress}>Reject</RejectButton>
            </Actions>
}
          </UserRow>
     )
        )}
    </ApprovalCard>
  </PageWrapper>
    );
}
export default AccountApproval;
