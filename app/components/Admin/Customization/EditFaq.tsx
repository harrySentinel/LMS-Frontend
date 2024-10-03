import { styles } from '@/app/styles/style';
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '../../Loader/Loader';

type Faq = {
  _id: string;
  question: string;
  answer: string;
  active?: boolean;
};

type Props = {}

const EditFaq = (props: Props) => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [questions, setQuestions] = useState<Faq[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
        refetch();
      toast.success("FAQ Updated Successfully!");
    }
    if (error) {
      const errorMessage = (error as any)?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString(), // Generate unique ID for new items
        question: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnchanged = (originalQuestions: Faq[], newQuestions: Faq[]) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: Faq[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
          <div className='mt-12'>
            <dl className='space-y-8'>
              {questions.map((q) => (
                <div key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}>
                  <dt className='text-lg'>
                    <button className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
                      onClick={() => toggleQuestion(q._id)}>
                    </button>
                    <input
                      className={`${styles.input} border-none`}
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(q._id, e.target.value)
                      }
                      placeholder={"Add Your Question..."}
                    />
                    <span className='ml-0 flex-shrink-0'>
                      <AiOutlineDelete
                        className='dark:text-white text-black text-[10px] cursor-pointer'
                        onClick={() => {
                          setQuestions((prevQuestions) =>
                            prevQuestions.filter((item) => item._id !== q._id)
                          );
                        }}
                      />
                    </span>
                  </dt>
                  <textarea
                    className={`${styles.input} border-none mt-2`}
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                    placeholder={"Add Your Answer..."}
                  />
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline className='dark:text-white text-black text-[25px] cursor-pointer'
              onClick={newFaqHandler}
            />
          </div>
          <div className={`${
            styles.button
          } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
          ${
            areQuestionsUnchanged(data.layout.faq, questions) ||
            isAnyQuestionEmpty(questions)
              ? "!cursor-not-allowed"
              : "!cursor-pointer !bg-[#42d383]"
          }
          !rounded absolute bottom-12 right-12`}
            onClick={
              areQuestionsUnchanged(data.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
