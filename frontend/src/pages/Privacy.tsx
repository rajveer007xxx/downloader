export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy <span className="text-blue-600">Policy</span>
        </h2>
        <p className="text-gray-600">Last updated: November 15, 2025</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
        <section>
          <h3 className="text-2xl font-bold mb-4">1. Introduction</h3>
          <p className="text-gray-700 mb-4">
            Welcome to A2Z Downloader. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your data when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">2. Information We Collect</h3>
          <p className="text-gray-700 mb-4">
            A2Z Downloader is designed with privacy in mind. We collect minimal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Video URLs:</strong> When you use our service, we temporarily process the video URL you provide to facilitate the download. These URLs are not stored permanently.</li>
            <li><strong>Technical Data:</strong> We may collect basic technical information such as IP address, browser type, and device information through standard server logs for security and performance purposes.</li>
            <li><strong>Contact Information:</strong> If you contact us through our contact form, we collect your name, email address, and message content solely for the purpose of responding to your inquiry.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">3. How We Use Your Information</h3>
          <p className="text-gray-700 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>To provide and maintain our video downloading service</li>
            <li>To process your download requests</li>
            <li>To respond to your inquiries and support requests</li>
            <li>To monitor and analyze usage patterns to improve our service</li>
            <li>To detect, prevent, and address technical issues and security threats</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">4. Data Storage and Retention</h3>
          <p className="text-gray-700 mb-4">
            We do not store your downloaded videos. All video processing is done in real-time, and temporary files are automatically deleted from our servers within a short period (typically within 1 hour).
          </p>
          <p className="text-gray-700 mb-4">
            Server logs and technical data are retained for a limited period for security and performance monitoring purposes, after which they are automatically deleted.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h3>
          <p className="text-gray-700 mb-4">
            Our website may use cookies and similar tracking technologies to enhance user experience and analyze website traffic. You can control cookie settings through your browser preferences.
          </p>
          <p className="text-gray-700 mb-4">
            We may use third-party services (such as Google Analytics or advertising networks) that use cookies to collect anonymous usage statistics. These services have their own privacy policies.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">6. Third-Party Services</h3>
          <p className="text-gray-700 mb-4">
            Our service interacts with third-party video platforms to facilitate downloads. When you provide a video URL, our servers communicate with the respective platform to retrieve video information. We do not control these third-party platforms and are not responsible for their privacy practices.
          </p>
          <p className="text-gray-700 mb-4">
            We may display advertisements through third-party advertising networks. These networks may collect information about your browsing activities across different websites.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">7. Data Security</h3>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">8. Your Rights</h3>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The right to access your personal data</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to erasure of your data</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
          </ul>
          <p className="text-gray-700 mt-4">
            To exercise these rights, please contact us through our Contact page.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">9. Children's Privacy</h3>
          <p className="text-gray-700 mb-4">
            Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">10. International Data Transfers</h3>
          <p className="text-gray-700 mb-4">
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our service, you consent to such transfers.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">11. Changes to This Privacy Policy</h3>
          <p className="text-gray-700 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">12. Contact Us</h3>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us through our Contact page or email us at privacy@a2zdownloader.com.
          </p>
        </section>
      </div>
    </div>
  )
}
