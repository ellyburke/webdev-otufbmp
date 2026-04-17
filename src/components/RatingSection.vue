<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  itemId: Number,
  compact: {
    type: Boolean,
    default: false
  }
})

//stores the name entered by the user and star rating
const raterName = ref('')
const selectedRating = ref(0)
const averageRating = ref(0)
const ratingCount = ref(0)
const loading = ref(false)
const errorMessage = ref('')

//average rating display
const roundedAverage = computed(() => Number(averageRating.value || 0).toFixed(1))
const filledStars = computed(() => Math.round(averageRating.value || 0))

//loads the current rating data
async function loadRatings() {
  if (!props.itemId) return

  try {
    const response = await fetch(`http://localhost:3000/ratings/${props.itemId}`)
    const data = await response.json()
    averageRating.value = data.average_rating || 0
    ratingCount.value = data.rating_count || 0
  } catch (error) {
    console.error('Error loading ratings:', error)
  }
}

//sends the user's rating to the backend
async function submitRating() {
  if (!props.itemId || selectedRating.value < 1 || selectedRating.value > 5) {
    errorMessage.value = 'Choose 1 to 5 stars.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost:3000/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item_id: props.itemId,
        user: 'Anonymous',
        rating: selectedRating.value
      })
    })

    if (!response.ok) {
      throw new Error('Unable to save rating')
    }

    await loadRatings()
    selectedRating.value = 0
  } catch (error) {
    console.error('Error submitting rating:', error)
    errorMessage.value = 'Could not save your rating.'
  } finally {
    loading.value = false
  }
}

onMounted(loadRatings)
watch(() => props.itemId, loadRatings)
</script>

<template>
  <div class="rating-box">
    <div class="rating-summary">
      <span class="stars-display">
        <span
          v-for="star in 5"
          :key="`display-${star}`"
          class="summary-star"
          :class="{ filled: star <= filledStars }"
        >
          ★
        </span>
      </span>
      <span class="rating-text">{{ roundedAverage }}/5</span>
      <span class="rating-count">({{ ratingCount }} ratings)</span>
    </div>

    <div v-if="!compact" class="rating-form">
      <p class="rating-label">Give us a rating</p>

      <div class="star-picker">
        <button
          v-for="star in 5"
          :key="`picker-${star}`"
          type="button"
          class="star-button"
          :class="{ active: star <= selectedRating }"
          @click="selectedRating = star"
        >
          ★
        </button>
      </div>

      <button class="button is-warning" :disabled="loading" @click="submitRating">
        {{ loading ? 'Saving...' : 'Submit Rating' }}
      </button>

      <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.rating-box {
  margin: 12px 0;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rating-label {
  margin-bottom: 10px;
  font-weight: 600;
  color: #444;
}

.summary-star,
.star-button {
  font-size: 1.2rem;
  color: #cfcfcf;
}

.summary-star.filled,
.star-button.active {
  color: #ffb703;
}

.star-picker {
  display: flex;
  gap: 4px;
  margin: 10px 0;
}

.star-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.rating-form {
  margin-top: 12px;
}

.rating-form .input {
  max-width: 260px;
  margin-bottom: 10px;
}

.rating-text,
.rating-count {
  color: #444;
}
</style>