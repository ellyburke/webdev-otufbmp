<template>
    <nav class="navbar">
        <!-- Site title -->
        <a href="./">Working title</a>

        <section class="listing-toggle">
            <section class="slider">
                <button 
                    class="all-listings"
                    :class="{active: activeView === 'all'}" 
                    @click="setView('all')"
                >
                    All Listings
                </button>
                <button 
                    class="favourites"
                    :class="{active: activeView === 'favourites'}" 
                    @click="setView('favourites')"
                >
                    Favourites
                </button>
            </section>
        </section>

        <button class="profile-btn">Profile</button>
    </nav>
</template>

<script setup>
    import { ref } from 'vue';

    // Local state
    const activeView = ref('all'); // 'all' or 'favourites'

    // emit event parent when toggled
    const emit = defineEmits('view change', 'profile-click')

    function setView(view){
        activeView.value = view;
        emit('view change', view);
    }
</script>

<style scoped>
.navbar {
    width: 100%; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f0caff;
    color: rgb(0, 0, 0);
}

.listing-toggle {
  position: relative;
  display: flex;
  background: #2a2a2a;
  border-radius: 999px;
  padding: 4px;
  width: 220px;
}

/* Sliding background for toggle */
.slider {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background: #4f46e5;
    border-radius: 999px; /* Pill looking */
    transition: left 0.3s ease;
}

.slider.favourites{
    transform: translateX(100%);
}

.listings-toggle button {
    flex: 1;
    border: none;
    background: transparent;
    color: #aaa;
    cursor: pointer;
    z-index: 1;
    padding: 6px 0;
    border-radius: 999px;
    transition: color 0.2s;
}

/* Active text */
.toggle button.active {
  color: white;
}

</style>