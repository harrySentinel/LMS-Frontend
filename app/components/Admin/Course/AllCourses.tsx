import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useDeleteCourseMutation, useGetAllCourseQuery } from "@/redux/features/courses/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
  const { isLoading, data, refetch } = useGetAllCourseQuery({}, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.Message);
      }
    }
    
  }, [ isSuccess,error]);

   // Handling user deletion
   const handleDeleteUser = async (id: string) => {
    await deleteCourse(id);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Dialog>
  <DialogTrigger> <AiOutlineDelete className="dark:text-white text-black" size={20} /></DialogTrigger>
  <DialogContent className="dark:bg-[#3e4396]  dark:text-white text-black">
    <DialogHeader>
      <DialogTitle className="mb-3 ">Are you absolutely sure?</DialogTitle>
      <DialogDescription className="text-white">
        This action cannot be undone. This will permanently delete this course
        and remove this course from our servers.
        <br/>
        <br/>
        <Button onClick={() => handleDeleteUser(params.row.id)} className=" bg-[#8b0000] text-white">
         Confirm
         </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
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
          <Box
            m="40px 0 0 0 "
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

export default AllCourses;
