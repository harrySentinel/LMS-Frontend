import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.Message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  // Handling form submission for adding a new member
  const handleAddMember = async () => {
    const user = data?.users.find((u: any) => u.email === email);
    if (user && role) {
      await updateUserRole({ id: user._id, role });
      setEmail("");
      setRole("");
      toast.success("Member added successfully!");
    } else {
      toast.error("Please enter a valid email and role.");
    }
  };

  // Handling user deletion
  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        
        <Dialog>
        <DialogTrigger> <AiOutlineDelete className="dark:text-white text-black" size={20} /></DialogTrigger>
        <DialogContent className="dark:bg-[#3e4396]  dark:text-white text-black">
          <DialogHeader>
            <DialogTitle className="mb-3 ">Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-white">
              This action cannot be undone. This will permanently delete this user
              and remove this user from our servers.
              <br/>
              <br/>
              <Button onClick={() => handleDeleteUser(params.row.id)} className=" bg-[#8b0000] text-white">
               Confirm
               </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      ),
    },
    {
      field: "emailUser",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <a href={`mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        </Button>
      ),
    },
  ];

  const rows: any = [];
  if (isTeam) {
    const newData = data?.users.filter((item: any) => item.role === "admin");
    newData?.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  } else {
    data?.users.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <Dialog>
              <DialogTrigger className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#3e4396] text-center text-[#fff] rounded  cursor-pointer">Update User Role</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-3">Update User Role</DialogTitle>
                  <label className={`${styles.label}`}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email"
                    className={`${styles.input}`}
                  />

                  <label className={`${styles.label} mt-2`}>Select Role</label>
                  <div>
                    <label className={`${styles.label} m-2`}>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        onChange={(e) => setRole(e.target.value)}
                        className="m-1"
                      />
                      Admin
                    </label>
                    <label className={`${styles.label} m-2`}>
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        onChange={(e) => setRole(e.target.value)}
                        className="m-1"
                      />
                      User
                    </label>
                  </div>

                  <Button onClick={handleAddMember}>Submit</Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                color: theme === "dark" ? "#1F2A40" : "#F2F2F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important " : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                colors: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
