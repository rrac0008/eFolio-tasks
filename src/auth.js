import { ref } from 'vue'

export const isAuthenticated = ref(false)

export function login(username, password) {
  if (username === 'admin' && password === 'password123') {
    isAuthenticated.value = true
    return true
  }
  return false
}

export function logout() {
  isAuthenticated.value = false
}