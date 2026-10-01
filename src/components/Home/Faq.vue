<template>
  <section class="faq-section">
    <div class="faq-container">

      <h2>Frequently Asked Questions</h2>

      <p class="faq-subtitle">
        Your Multi-College Enrollment Portal — Top 7 Questions
      </p>

      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
      >
        <button
          type="button"
          class="faq-question"
          @click="toggleFaq(index)"
          :aria-expanded="openIndex === index"
        >
          <span>{{ faq.question }}</span>

          <span class="faq-icon">
            {{ openIndex === index ? '−' : '+' }}
          </span>
        </button>

        <div
          v-if="openIndex === index"
          class="faq-answer"
        >
          {{ faq.answer }}
        </div>
      </div>

    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const toggleFaq = (index) => {
  openIndex.value =
    openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'What is College Enroll?',
    answer:
      'College Enroll is a single enrollment portal that connects students with multiple colleges, allowing them to explore courses, compare options, and apply to several institutions from one platform instead of visiting each college separately.'
  },

  {
    question: 'How does College Enroll work?',
    answer:
      'Students create a profile on College Enroll, share academic details and preferences, and the portal matches them with suitable colleges and courses. From there, students can submit applications, track status, and get counseling support — all in one place.'
  },

  {
    question: 'How many colleges can I apply to through College Enroll?',
    answer:
      'College Enroll is designed as a multi-college platform, so students are not limited to a single institution. They can explore and apply to as many partner colleges as match their interests, eligibility, and course preferences.'
  },

  {
    question:
      'Does College Enroll offer counseling support during the application process?',
    answer:
      'Yes, College Enroll pairs its enrollment portal with student counseling support, helping applicants choose the right colleges and courses and guiding them through each step of the admission process.'
  },

  {
    question:
      "What makes College Enroll different from applying directly to a college's website?",
    answer:
      "Instead of repeating the same process on every college's individual website, College Enroll centralizes the search, comparison, counseling, and application steps for multiple colleges in a single portal — saving time and effort."
  },

  {
    question: 'How do I get started with College Enroll?',
    answer:
      'Visit collegeenroll.in, create your student profile, fill in your academic and course preferences, and the portal will guide you through exploring colleges, applying, and tracking your applications.'
  },

  {
    question: 'Is using College Enroll free for students?',
    answer:
      'Yes, browsing courses, comparing institutions, and accessing admission counseling on College Enroll is free for students.'
  }
]
</script>


<style scoped>
.faq-section {
  padding: 60px 20px;
  background: #ffffff;
}

.faq-container {
  max-width: 1000px;
  margin: 0 auto;
}

.faq-container h2 {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #111111;
}

.faq-subtitle {
  text-align: center;
  color: #666666;
  margin-bottom: 35px;
  font-size: 16px;
}

.faq-item {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  background: #ffffff;
}

.faq-question {
  width: 100%;
  border: none;
  background: #ffffff;
  padding: 18px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  text-align: left;
  cursor: pointer;

  font-size: 16px;
  font-weight: 600;
  color: #222222;
}

.faq-question:hover {
  background: #fff7f0;
}

.faq-icon {
  font-size: 24px;
  font-weight: 400;
  color: #ff6b00;

  margin-left: 15px;
  flex-shrink: 0;
}

.faq-answer {
  padding: 0 20px 20px;

  color: #555555;
  line-height: 1.7;
  font-size: 15px;

  background: #ffffff;
}


@media (max-width: 768px) {

  .faq-section {
    padding: 40px 15px;
  }

  .faq-container h2 {
    font-size: 26px;
  }

  .faq-question {
    padding: 16px;
    font-size: 15px;
  }

  .faq-answer {
    padding: 0 16px 16px;
    font-size: 14px;
  }
}
</style>