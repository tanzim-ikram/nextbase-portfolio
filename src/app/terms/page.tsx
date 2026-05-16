export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-12 md:py-24 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Terms and Conditions</h1>
      <div className="prose prose-base-content max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Please read these terms and conditions carefully before using this website.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h2>2. Intellectual Property</h2>
        <p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary laws. Some open source projects may have their own respective licenses.</p>

        <h2>3. Disclaimer</h2>
        <p>The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2>4. Modifications</h2>
        <p>We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
      </div>
    </div>
  );
}
