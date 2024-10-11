import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react'
import ReviewCard from "../Review/ReviewCard"

type Props = {}
export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10 Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full stack developer | Quarter ltd.",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "computer systems engineering student | Zimbabwe",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 oro, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    },
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 oinibus Bono Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full stack developer | Quarter ltd.",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33  Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    }, {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 o Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full stack developer | Quarter ltd.",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 ofe Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,.32.  ",
    },];


const Reviews = (props: Props) => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src={require("../../../public/assets/business-img.jpg")}
                        alt="business"
                        width={700}
                        height={700}
                    />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className="text-gradient">Our Strength</span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={styles.label}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
                        voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
                        possimus magni deleniti natus accusamus officiis quasi nihil
                        commodi, praesentium quidem, quis doloribus?
                    </p>
                </div>
                <br />
                <br />

            </div >
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[40px]">
                {reviews &&
                    reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
            </div>
        </div >
    );
};

export default Reviews