<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="py-4 text-sm text-gray-500 border-b border-gray-200">
        <ol class="flex space-x-2">
          <li>
            <router-link to="/" class="hover:text-gray-700">Home</router-link>
          </li>
          <span>/</span>
          <li class="font-medium text-gray-700">
            College Entry Terms & Conditions
          </li>
        </ol>
      </nav>

      <main class="py-10">
        <h1 class="text-3xl font-normal text-gray-900 mb-6">
          Terms & Conditions
        </h1>

        <section class="text-gray-900 text-sm leading-relaxed space-y-6">
          <p>
            Welcome to
            <span class="font-semibold">Collegentry</span>
            <a
              href="https://collegeentry.in"
              target="_blank"
              class="text-blue-600 hover:underline ml-1"
            >
              https://collegeentry.in/ </a
            >. These Terms and Conditions ("Terms") govern your use of our
            website, services, and tools. By accessing or using Collegentry, you
            agree to be bound by these Terms. If you do not agree, please do not
            use our services.
          </p>

          <!-- 1 -->
          <div class="space-y-2">
            <h2 class="font-semibold">1. Acceptance of Terms</h2>
            <ul class="list-disc pl-6 space-y-1">
              <li>You are at least 18 years old, or</li>
              <li>
                You are using the Website under the supervision of a parent or
                legal guardian.
              </li>
            </ul>
            <p>
              Your continued use of the Website constitutes acceptance of these
              Terms and any future updates or modifications.
            </p>
          </div>

          <!-- 2 -->
          <div class="space-y-2">
            <h2 class="font-semibold">2. Nature of Services</h2>
            <p>
              Collegentry is an educational discovery and information platform
              that provides:
            </p>

            <ul class="list-disc pl-6 space-y-1">
              <li>College profiles</li>
              <li>Course information</li>
              <li>Fee estimates</li>
              <li>Admission timelines</li>
              <li>Counseling or support services (where applicable)</li>
            </ul>

            <p class="font-medium mt-2">Disclaimer:</p>
            <p>
              All information is provided for informational purposes only. We
              strive for accuracy but do not guarantee completeness,
              correctness, or real-time updates, as data may be provided by
              third-party institutions.
            </p>
          </div>

          <!-- 3 -->
          <div class="space-y-2">
            <h2 class="font-semibold">3. User Responsibilities</h2>

            <p class="font-medium">Account Security</p>
            <p>
              Maintain the confidentiality of your login credentials and accept
              responsibility for all activities under your account.
            </p>

            <p class="font-medium">Accurate Information</p>
            <p>
              Provide true, complete, and accurate details when submitting forms
              or applications.
            </p>

            <p class="font-medium">Prohibited Conduct</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Post harmful, illegal, or defamatory content</li>
              <li>Use bots, scraping tools, or automated systems</li>
              <li>Attempt to breach security or disrupt services</li>
              <li>Misuse the platform for fraudulent purposes</li>
            </ul>
          </div>

          <!-- 4 -->
          <div class="space-y-2">
            <h2 class="font-semibold">4. Intellectual Property Rights</h2>
            <p>
              All Website content including text, graphics, logos, design,
              software, and data is the property of Collegentry or its licensors
              and protected by intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, distribute, modify, or commercially
              use any content without prior written permission.
            </p>
          </div>

          <!-- 5 -->
          <div class="space-y-2">
            <h2 class="font-semibold">5. Fees and Payments</h2>

            <p class="font-medium">Free Access</p>
            <p>Basic browsing and college discovery features are free.</p>

            <p class="font-medium">Paid Services</p>
            <p>
              Premium services (such as counseling or application assistance)
              may be offered for a fee, clearly communicated before purchase.
            </p>

            <ul class="list-disc pl-6 space-y-1">
              <li>Fees are non-refundable</li>
              <li>Payments are final</li>
            </ul>

            <p class="font-medium">Third-Party Payments</p>
            <p>
              Collegentry is not responsible for payments or transactions made
              directly between users and colleges or institutions.
            </p>
          </div>

          <!-- 6 -->
          <div class="space-y-2">
            <h2 class="font-semibold">6. Limitation of Liability</h2>
            <ul class="list-disc pl-6 space-y-1">
              <li>Errors or outdated college information</li>
              <li>Decisions made based on Website content</li>
              <li>Admission outcomes</li>
              <li>Financial losses</li>
              <li>Website downtime or technical issues</li>
              <li>Third-party actions or services</li>
            </ul>
          </div>

          <!-- 7 -->
          <div class="space-y-2">
            <h2 class="font-semibold">7. Third-Party Links</h2>
            <p>
              Our Website may contain links to external websites or partners. We
              do not control or endorse their content and are not responsible
              for their practices. Users access third-party sites at their own
              discretion.
            </p>
          </div>

          <!-- 8 -->
          <div class="space-y-2">
            <h2 class="font-semibold">8. Privacy</h2>
            <p>
              Your use of Collegentry is also governed by our Privacy Policy,
              which explains how we collect, use, and protect your personal
              data.
            </p>
          </div>

          <!-- 9 -->
          <div class="space-y-2">
            <h2 class="font-semibold">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the
              Website at any time without notice if you violate these Terms or
              engage in harmful activities.
            </p>
          </div>

          <!-- 10 -->
          <div class="space-y-2">
            <h2 class="font-semibold">10. Changes to Terms</h2>
            <p>
              We may update these Terms periodically. Continued use of the
              Website after updates indicates acceptance of the revised Terms.
            </p>
          </div>

          <!-- 11 -->
          <div class="space-y-2">
            <h2 class="font-semibold">11. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes
              shall be subject to the exclusive jurisdiction of the courts
              located in
              <span class="italic">[Insert City/State]</span>.
            </p>
          </div>

          <!-- 12 -->
          <div class="space-y-2">
            <h2 class="font-semibold">12. Contact Us</h2>
            <p>Email: info@collegeentry.in</p>
            <p>
              Address: D-185, Phase 8B, Industrial Area, Sector 74, Punjab,
              Mohali, 160055
            </p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for this static page
</script>

<style scoped>
/*
  This custom style is used to correctly render lower-alpha lists (a, b, c...)
  Tailwind CSS doesn't have a direct utility class for this list style type.
*/
.list-lower-alpha {
  list-style-type: lower-alpha;
}
</style>
