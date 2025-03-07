import React from 'react';

type Props = {};

const About: React.FC<Props> = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Welcome to Our E-Learning Platform</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Unlock limitless learning opportunities with our interactive and engaging platform. Whether you are a student or an instructor,
        we provide the tools you need to succeed in the digital education era.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Our platform is designed to make education accessible to everyone, anytime and anywhere. We believe in empowering individuals 
        with knowledge and skills that can help them excel in their careers and personal growth. With a wide range of courses spanning 
        multiple disciplines, we offer high-quality educational resources for learners of all backgrounds and expertise levels.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Education is the foundation of progress, and we are committed to making learning easy, affordable, and enjoyable. Our instructors
        are industry professionals with years of experience, ensuring that our courses are both relevant and practical. Whether you want
        to master coding, develop business acumen, or explore creative fields, our platform has something for you.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>📚 Expert-curated courses across various domains</li>
            <li>🎥 Immersive video lectures & interactive quizzes</li>
            <li>🔒 Secure payments via Stripe integration</li>
            <li>☁️ Cloud-based video storage powered by Cloudinary</li>
            <li>📊 Real-time progress tracking & analytics</li>
            <li>🌎 Learn at your own pace from anywhere in the world</li>
            <li>👩‍🏫 Connect with experienced instructors and mentors</li>
            <li>📝 Certification upon course completion to showcase your skills</li>
            <li>💡 AI-powered personalized learning recommendations</li>
            <li>🤝 Community support and peer networking opportunities</li>
          </ul>
        </div>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-6 mb-6">
        Our learning management system is built with the latest technology to ensure smooth functionality, secure transactions,
        and an easy-to-navigate user interface. Whether you are accessing our platform from a desktop, tablet, or smartphone,
        you will experience seamless learning without interruptions.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We also believe in the power of community. Our discussion forums allow students and instructors to engage in meaningful 
        conversations, share insights, and collaborate on projects. You are never alone in your learning journey—we provide 
        constant support to help you succeed.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        If you are an instructor looking to share your knowledge, our platform offers the perfect space for you to create and 
        monetize your courses. With advanced analytics, you can track student performance, gain insights into engagement, 
        and continuously improve your content to maximize impact.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Our mission is to bridge the gap between traditional education and modern technological advancements. By leveraging AI-driven 
        insights and interactive multimedia content, we ensure that our learners receive the best educational experience possible.
      </p>
     
    </div>
  );
};

export default About;