<template>
    <div class="container mt-5">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label>Username</label>
          <input v-model="username" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" />
        </div>
        <button class="btn btn-primary">Login</button>
        <div v-if="error" class="text-danger mt-2">{{ error }}</div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { login, isAuthenticated } from '../auth'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const error = ref(null)
  const router = useRouter()
  
  const handleLogin = () => {
    const success = login(username.value, password.value)
    if (success) {
      error.value = null
      router.push('/about') 
    } else {
      error.value = 'Invalid credentials'
    }
  }
  </script>
  