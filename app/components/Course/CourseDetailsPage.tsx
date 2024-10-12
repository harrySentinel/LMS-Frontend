import { useGetCourseDetailsQuery } from '@/redux/features/courses/courseApi';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from "./CourseDetails";

type Props = {
    id: string;
}

const CourseDetailsPage = ({ id }: Props) => {
    console.log(id);
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);

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
                        <CourseDetails
                        data={data.course}
                        />
                        <Footer/>

                    </div>
                )}
        </>
    );
};

export default CourseDetailsPage