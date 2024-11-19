import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateCourseMutation } from '@/redux/features/courses/courseApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from "next/navigation";
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    setOpen: any;
    data: any;
}

const CheckOutForm = ({setOpen, data}:Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message,setMessage] = useState<any>("");
    const [createOrder,{data:orderData,error}] = useCreateCourseMutation();
    const [loadUser,setLoadUser] = useState(false);
    const {} = useLoadUserQuery({skip:loadUser?false:true})
    const [isLoading,setIsLoading] = useState(false)

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsLoading(true);
        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            redirect:"if_required",
        });
        if(error){
            setMessage(error.message);
            setIsLoading(false);
        }else if(paymentIntent && paymentIntent.status === 'succeeded'){
            setIsLoading(false);
            createOrder({courseId: data._id, payment_info:paymentIntent})
        }
    };

    useEffect(()=>{
        if(orderData){
            setLoadUser(true);
            redirect('/course-access/${data._id}')
        }
        if(error){
            if("data" in error){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    },[orderData,error])
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <LinkAuthenticationElement id="link-authentication-element"
      // Access the email value like so:
      // onChange={(event) => {
      //  setEmail(event.value.email);
      // }}
      //
      // Prefill the email field like so:
      // options={{defaultValues: {email: 'foo@bar.com'}}}
      />
    <PaymentElement id="payment-element" />
    <button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text">
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </span>
    </button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
  </form>
  )
}

export default CheckOutForm 