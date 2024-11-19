import { useGetCourseDetailsQuery } from '@/redux/features/courses/courseApi';
import React, { useState,useEffect } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from "./CourseDetails";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/orderApi';
import { loadStripe } from "@stripe/stripe-js"
type Props = {
    id: string;
}

const CourseDetailsPage = ({ id }: Props) => {
    console.log(id);
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    const {data: config} = useGetStripePublishableKeyQuery({});
    const [createPaymentIntent,{data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [stripePromise,setStripePromise] = useState<any>(null);
    const [clientSecret,setClientSecret] = useState('')

    useEffect(()=>{
        if(config){
            const publishablekey = config?.publishablekey;
            setStripePromise(loadStripe(publishablekey))
        }
        if(data){
            const amount = Math.round(data.course.price * 100);
            createPaymentIntent(amount);
        };
    },[config,data]);

    useEffect(()=>{
        if(paymentIntentData){
            setClientSecret(paymentIntentData?.client_secret);
        }
    },[paymentIntentData])

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={ "- ELearning"}
                            description={
                                "The Great Sage is a learning community which is developed by RHV for helping students"
                            }
                            keywords={data?.course?.tags}
                        />
                        <Header
                            route={route}
                            setRoute={setRoute}
                            open={open}
                            setOpen={setOpen}
                            activeItem={1}
                        />
                      
                        {
                            stripePromise && (
                                 <CourseDetails
                                data={data.course}
                                stripePromise={stripePromise}
                                clientSecret={clientSecret}
                                />
                            )
                        }
                        <Footer/>

                    </div>
                )}
        </>
    );
};

export default CourseDetailsPage