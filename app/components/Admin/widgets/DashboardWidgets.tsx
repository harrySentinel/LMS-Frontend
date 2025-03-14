"use client";
import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

type ComparePercentage = {
  currentMonth: number;
  previousMonth: number;
  percentChange: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<ComparePercentage | undefined>(undefined);
  const [userComparePercentage, setUserComparePercentage] = useState<ComparePercentage | undefined>(undefined);

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading || ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const orderLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (usersLastTwoMonths.length === 2 && orderLastTwoMonths.length === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersPreviousMonth = orderLastTwoMonths[0].count;
          const orderCurrentMonth = orderLastTwoMonths[1].count;

          const usersPercentChange = usersPreviousMonth !== 0 ?
          ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 :100;
          
          
          const ordersPercentChange = ordersPreviousMonth !== 0 ?
          ((orderCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });
          setOrderComparePercentage({
            currentMonth: orderCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UsersAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45cBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={
                  orderComparePercentage?.percentChange > 0
                    ? 100
                    : 0
                } open={open} />
                <h5 className="text-center pt-4">
                  {orderComparePercentage?.percentChange > 0
                    ? "+"  + orderComparePercentage?.percentChange.toFixed(2)
                    : "-" + orderComparePercentage?.percentChange.toFixed(2)}%
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={
                  userComparePercentage?.percentChange > 0
                    ? 100
                    : 0
                } open={open} />
                <div className="text-center pt-4">
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : "-" + userComparePercentage?.percentChange.toFixed(2)} %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default DashboardWidgets;
