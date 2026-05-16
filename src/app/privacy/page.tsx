export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-12 md:py-24 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <div className="prose prose-base-content max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>This Privacy Policy describes how we collect, use, and handle your information when you use our website.</p>
        
        <h2>1. Information We Collect</h2>
        <p>We may collect personal information such as your name, email address, and message content when you voluntarily submit forms on our website.</p>

        <h2>2. How We Use Your Information</h2>
        <p>The information we collect is primarily used to respond to your inquiries, improve our services, and communicate with you.</p>

        <h2>3. Data Security</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>

        <h2>4. Contact Us</h2>
        <p>If you have any questions regarding this privacy policy, please contact us using the form on the homepage.</p>
      </div>
    </div>
  );
}
