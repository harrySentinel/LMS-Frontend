"use client";
import React, { useEffect, useState, useCallback } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {  useEditCourseMutation, useGetAllCourseQuery } from "@/redux/features/courses/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import {FC} from "react";

type Props = {
    id: string;
};

const EditCourse:FC<Props>= ({id}) => {


 const [editCourse,{isSuccess,error}] = useEditCourseMutation();
  const { data, refetch } = useGetAllCourseQuery(
    {}, { refetchOnMountOrArgChange: true }
);
const editCourseData = data && data.courses.find((i:any) => i._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
      redirect("/admin/courses");
    }

    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if(editCourseData){
        setCourseInfo({
            name: editCourseData.name,
            description: editCourseData.description,
            price: editCourseData.price,
            estimatedPrice: editCourseData.estimatedPrice,
            tags: editCourseData.tags,
            level: editCourseData.level,
            demoUrl: editCourseData.demoUrl,
            thumbnail: editCourseData?.thumbnail?.url,
        })
        setBenefits(editCourseData.benefits);
        setPrerequisites(editCourseData.prerequisites);
        setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "", // Required field
    description: "", // Required field
    price: "", // Required field
    estimatedPrice: "",
    tags: "", // Required field
    level: "", // Required field
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<any>(null); // State to store course data

   console.log(courseData);

  // Function to prepare and validate course data
  const handleSubmit = useCallback(() => {
    const { name, description, price, estimatedPrice, tags, level, thumbnail, demoUrl } = courseInfo;

    // Validate required fields
    if (!name || !description || !price || !tags || !level) {
      toast.error("Please fill in all required fields: name, description, price, tags, and level.");
      return null; // Exit if validation fails
    }

    // Prepare benefits, prerequisites, and course content
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    // Prepare the final data object
    const data = {
      name,
      description,
      price,
      estimatedPrice,
      tags,
      thumbnail,
      level,
      demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };

    setCourseData(data); // Set the course data to state
    return data;
  }, [courseInfo, benefits, prerequisites, courseContentData]);

  // Use useEffect to automatically prepare courseData when the user reaches the preview stage
  useEffect(() => {
    if (active === 3) {
      handleSubmit();
    }
  }, [active, handleSubmit]);

  // Function to handle course creation
  // const handleCourseCreate = async () => {
  //   if (!courseData) return; // Stop if validation fails

  // };

  const handleCourseCreate = async (e: any) => { 
   
  
    const data = courseData; // Assign courseData to a variable
    await editCourse({id:editCourseData?._id,data});
  
 
  };
  

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData} // Use the prepared courseData state for the preview
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
