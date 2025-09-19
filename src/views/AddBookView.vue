<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
  
      <div style="margin-top:20px;">
        <button @click="fetchBooks" class="btn btn-primary me-2">Fetch ISBN > 1000</button>
        <button @click="fetchOrderedBooks" class="btn btn-secondary me-2">Fetch Ordered by ISBN</button>
        <button @click="fetchLimitedBooks" class="btn btn-success">Fetch Top 3 Books</button>
      </div>
  
      <h2 class="mt-4">Fetched Books</h2>
      <ul class="list-group">
        <li
          v-for="book in books"
          :key="book.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ book.name }} (ISBN: {{ book.isbn }})
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from "vue"
  import { db } from "@/firebase/init"
  import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    getDocs,
  } from "firebase/firestore"
  
  export default {
    setup() {
      const isbn = ref("")
      const name = ref("")
      const books = ref([])
  
      // Add book
      const addBook = async () => {
        try {
          const isbnNumber = Number(isbn.value)
          if (isNaN(isbnNumber)) {
            alert("ISBN must be a valid number")
            return
          }
  
          await addDoc(collection(db, "books"), {
            isbn: isbnNumber,
            name: name.value,
          })
  
          isbn.value = ""
          name.value = ""
          alert("Book added successfully!")
        } catch (error) {
          console.error("Error adding book: ", error)
        }
      }
  
      const fetchBooks = async () => {
        books.value = []
        const q = query(collection(db, "books"), where("isbn", ">", 1000))
        const snapshot = await getDocs(q)
        snapshot.forEach((docSnap) => {
          books.value.push({ id: docSnap.id, ...docSnap.data() })
        })
      }
  
      const fetchOrderedBooks = async () => {
        books.value = []
        const q = query(collection(db, "books"), orderBy("isbn", "desc"))
        const snapshot = await getDocs(q)
        snapshot.forEach((docSnap) => {
          books.value.push({ id: docSnap.id, ...docSnap.data() })
        })
      }
  
      const fetchLimitedBooks = async () => {
        books.value = []
        const q = query(collection(db, "books"), orderBy("isbn", "asc"), limit(3))
        const snapshot = await getDocs(q)
        snapshot.forEach((docSnap) => {
          books.value.push({ id: docSnap.id, ...docSnap.data() })
        })
      }
  
      return {
        isbn,
        name,
        books,
        addBook,
        fetchBooks,
        fetchOrderedBooks,
        fetchLimitedBooks,
      }
    },
  }
  </script>
  