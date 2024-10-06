'use client'
import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from './widgets/DashboardWidgets';

type Props = {
  isDashboard?: boolean;
}

const DashboardHero = ({isDashboard}: Props) => {
 const [open,setOpen] = useState(false);
  return (
    <div>
        <DashboardHeader />
        {
          isDashboard && (
            <DashboardWidgets open={open} />
          )
            
          
        }
        </div>
  )
}

export default DashboardHero