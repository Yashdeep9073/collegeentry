<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['close', 'update:activeTab']);

// Local state for search and filtering
const localSearchText = ref('');
const tabs = ["Colleges", "Exams", "Courses"]; // Reduced tabs for simplicity, use all your tabs if needed
const popularSearches = ref([
    { name: 'Chhattisgarh Pre Agriculture Test (CG PAT)', type: 'Exam' },
    { name: 'AIFD WAT', type: 'Exam' },
    { name: 'M.Des [Master of Design]', type: 'Course' },
    { name: 'DECE LE', type: 'Exam' },
    { name: 'CMAT', type: 'Exam' },
    { name: 'JEPBN', type: 'Exam' },
]);

// Computed property for placeholder text based on the active tab
const placeholderText = computed(() => {
    return `Search ${props.activeTab}...`;
});

// Function to handle tab change within the modal
const handleTabChange = (tab) => {
    emit('update:activeTab', tab);
    localSearchText.value = ''; // Clear search when tab changes
};

// Function to close the modal
const closeModal = () => {
    emit('close');
    localSearchText.value = ''; // Clear search on close
};

// Watch for the modal opening to focus the input
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        // Focus the input field when modal opens
        setTimeout(() => {
            document.getElementById('modal-search-input').focus();
        }, 100); 
    } else {
        document.body.style.overflow = ''; // Re-enable background scroll
    }
});

// Mock Search Results (Filter popular searches or a larger list based on input)
const searchResults = computed(() => {
    const query = localSearchText.value.toLowerCase();

    if (query.length < 3) {
        return popularSearches.value; // Show popular searches if query is short
    }
    
    // Simple filter logic for demo
    return popularSearches.value.filter(item => 
        item.name.toLowerCase().includes(query)
    );
});

// Handle the actual search submit
const handleSearchSubmit = () => {
    if (localSearchText.value.length > 2) {
        // In a real app, this would trigger navigation or an API call
        alert(`Searching for "${localSearchText.value}" in ${props.activeTab}`);
        closeModal();
    }
};

</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-container">
        
        <div class="p-8 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
            <div class="flex justify-center space-x-6 mb-6">
                <button
                    v-for="tab in tabs"
                    :key="tab"
                    @click="handleTabChange(tab)"
                    :class="{
                        'text-red-500 border-b-2 border-red-500 font-semibold': activeTab === tab,
                        'text-gray-500 hover:text-red-500': activeTab !== tab,
                    }"
                    class="py-2 px-3 text-lg transition duration-150"
                >
                    {{ tab }}
                </button>
            </div>

            <form @submit.prevent="handleSearchSubmit" class="flex max-w-2xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <input
                    id="modal-search-input"
                    type="text"
                    v-model="localSearchText"
                    :placeholder="placeholderText"
                    class="flex-grow px-5 py-3 text-lg text-gray-700 focus:outline-none"
                />
                <button 
                    type="submit" 
                    class="bg-red-500 text-white px-8 py-3 font-bold hover:bg-red-600 transition duration-150"
                >
                    Search
                </button>
            </form>
        </div>

        <div class="max-w-2xl mx-auto mt-6 px-4 pb-12">
            <p v-if="localSearchText.length < 3" class="text-sm text-gray-500 mb-4 font-medium">
                Type 3 or more characters for search results
            </p>

            <h3 v-if="localSearchText.length < 3" class="text-base font-bold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-star text-yellow-500 mr-2"></i> Popular Searches
            </h3>
            
            <div class="space-y-1">
                <div 
                    v-for="(item, index) in searchResults" 
                    :key="index"
                    class="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition duration-100"
                    @click="localSearchText = item.name; handleSearchSubmit()"
                >
                    <span class="text-gray-800 font-medium">{{ item.name }}</span>
                    <span class="text-xs font-semibold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">{{ item.type }}</span>
                </div>

                <div v-if="localSearchText.length >= 3 && searchResults.length === 0" class="text-center py-8">
                    <p class="text-gray-500">No results found for "{{ localSearchText }}" in {{ activeTab }}.</p>
                </div>
            </div>
        </div>

        <button class="modal-close-btn" @click="closeModal">
            <i class="fas fa-times text-2xl"></i>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Full Screen Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.98); /* Near-white opaque background */
  display: flex;
  justify-content: center;
  z-index: 1000; /* Ensure it's above everything */
  overflow-y: auto;
}

.modal-container {
  width: 100%;
  position: relative;
}

/* Close button style */
.modal-close-btn {
  position: fixed;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 10px;
  z-index: 1010;
  transition: transform 0.2s;
}

.modal-close-btn:hover {
    color: #ff5c00;
    transform: rotate(90deg);
}

/* Transition styles */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>