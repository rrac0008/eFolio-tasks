<template>
    <div>
      <h2>Books with ISBN > 1000</h2>
      <ul class="list-group">
        <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
          {{ book.name }} (ISBN: {{ book.isbn }})
          <div>
            <button class="btn btn-sm btn-warning me-2" @click="updateBook(book.id)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { db } from "../firebase/init.js";
  import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
  
  const books = ref([]);
  
  const fetchBooks = async () => {
    books.value = [];
    const q = query(collection(db, "books"), where("isbn", ">", 1000));
    const snapshot = await getDocs(q);
    snapshot.forEach((docSnap) => {
      books.value.push({ id: docSnap.id, ...docSnap.data() });
    });
  };
  
  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
    await fetchBooks();
  };
  
  const updateBook = async (id) => {
    const newName = prompt("Enter new book name:");
    if (newName) {
      await updateDoc(doc(db, "books", id), { name: newName });
      await fetchBooks();
    }
  };
  
  onMounted(fetchBooks);
  </script>