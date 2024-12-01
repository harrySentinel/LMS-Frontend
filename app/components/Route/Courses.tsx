import { useGetAllCourseQuery } from '@/redux/features/courses/courseApi'
import React, { useEffect, useState } from 'react'
import CourseCard from "../Course/CourseCard";

type Props = {}

function Courses({ }: Props) {
    const { data, isLoading } = useGetAllCourseQuery({});
    const [courses, setCourses] = useState<any[]>([]);


    useEffect(() => {
        setCourses(data?.courses);
    }, [data]);


    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto`}>
                <h1 className='test-center font-poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight'>
                    Expand Your Career {" "}
                    <span className='text-gradient'>Opportunity</span> <br />
                    opportunity With Our Courses
                </h1>
                <br />
                <br />
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 la:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                    {courses &&
                        courses.map((item: any, index: number) => (
                        
                            <CourseCard item={item} key={index} />
                       
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Courses