import React from 'react';

type Props = {};

const Policy: React.FC<Props> = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Privacy Policy</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Welcome to our E-Learning Platform. We value your privacy and are committed to protecting your personal data.
        This Privacy Policy explains how we collect, use, and safeguard your information.
      </p>
      
      <h2 className="text-2xl font-semibold text-blue-500 mb-3">1. Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
        <li>Personal data (name, email, phone number) when you sign up</li>
        <li>Course progress and learning preferences</li>
        <li>Payment details for course purchases (handled securely by Stripe)</li>
        <li>Technical data (IP address, browser type, device information)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-500 mb-3">2. How We Use Your Information</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Your data helps us enhance your learning experience by personalizing course recommendations,
        improving our platform, processing payments, and providing customer support.
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mb-3">3. Data Protection</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We implement strict security measures to protect your personal data from unauthorized access,
        alteration, or disclosure. We do not sell your data to third parties.
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mb-3">4. Cookies</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Our website uses cookies to enhance user experience. You can manage cookie preferences in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mb-3">5. Your Rights</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        You have the right to access, update, or delete your personal data. If you have any concerns, contact us at support@example.com.
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mb-3">6. Changes to This Policy</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We may update this Privacy Policy from time to time. We encourage you to review it regularly.
      </p>

      <div className="text-center mt-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">If you have any questions, please contact us at support@example.com.</p>
      </div>
    </div>
  );
};

export default Policy;