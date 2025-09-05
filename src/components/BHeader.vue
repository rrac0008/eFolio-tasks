<template>
    <!-- Bootstrap Header -->
    <div class="container">
      <header class="d-flex justify-content-between align-items-center py-3">
        <!-- Navigation links -->
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">
              Home (Week 5)
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">
              About
            </router-link>
          </li>
        </ul>
  
        <!-- Logout button -->
        <div>
          <button
            v-if="auth"
            class="btn btn-outline-danger btn-sm"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { isAuthenticated, logout } from '../auth'
  
  const router = useRouter()
  
  // Reactive computed for auth state
  const auth = computed(() => isAuthenticated.value)
  
  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.1);
    border: solid rgba(0, 0, 0, 0.15);
    border-width: 1px 0;
    box-shadow:
      inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
      inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
  }
  
  .form-control-dark {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: var(--bs-gray);
  }
  .form-control-dark:focus {
    color: #fff;
    background-color: var(--bs-dark);
    border-color: #fff;
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
  }
  
  .bi {
    vertical-align: -0.125em;
    fill: currentColor;
  }
  
  .text-small {
    font-size: 85%;
  }
  
  .dropdown-toggle {
    outline: 0;
  }
  </style>
  