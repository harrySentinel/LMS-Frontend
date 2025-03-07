'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Policy from './Policy'
import Footer from '../components/Footer'

type Props = {}

function page({}: Props) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [activeItem, setActiveItem] = useState(2);
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [route, setRoute] = useState("Login");
     return(
    <div>

    <Heading
    title='Policy - Elearning'
    description='Elearning is a platform that allows you to learn anything you want, anytime you want, anywhere you want.'
    keywords='programming, mern'
    />
    <Header
    open={open}
    setOpen={setOpen}
    activeItem={activeItem}
    route={route}
    setRoute={setRoute}

     />

     <Policy/>
     <Footer/>
    </div>
  )
}

export default page