import { useGetAllCourseQuery } from '@/redux/features/courses/courseApi';
import { useGetAllOrdersQuery } from '@/redux/features/orders/orderApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js";
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from "@mui/material";

type Props = {
    isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
    const { theme, setTheme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: courseData } = useGetAllCourseQuery({});
    const [orderData, setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
                const user = usersData?.users.find(
                    (user: any) => user.id === item.userId
                );
                const course = courseData?.courses.find(
                    (course: any) => course.id === item.courseId
                );
                return {
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price: "$" + course?.price,
                };
            });
            setOrderData(temp);
        }
    }, [data, usersData, courseData]);

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard
            ? []
            : [
                { field: "userEmail", headerName: "Email", flex: 1 },
                { field: "title", headerName: "Course Title", flex: 1 },
            ]),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard
            ? [
                { field: "created_at", headerName: "Created At", flex: 0.5 },
            ]
            : [
                {
                    field: "email",
                    headerName: "Email",
                    flex: 0.2,
                    renderCell: (params: any) => {
                        return (
                            <a href={`mailto:${params.row.userEmail}`}>
                                <AiOutlineMail className='dark:text-white text-black' size={20} />
                            </a>
                        );
                    },
                },
            ]),
    ];

    const rows: any = [];

    orderData && orderData.forEach((item: any) => {
        rows.push({
            id: item._id,
            userName: item.userName,
            title: item.title,
            price: item.price,
            created_at: format(item.createdAt),
        });
    });

    if (isLoading) return <Loader />;

    return (
        <div>
             <div className={!isDashboard?"mt-[120px]":"mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard?"0":"20px"}>
          <Box
            m={isDashboard?"0":"40px 0 0 0"}
            height={isDashboard?"35vh":"90vh"}
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
                color: theme === "dark" ? "#000" : "#000",
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
        </div>
    );
};

export default AllInvoices;
