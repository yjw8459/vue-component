<template>
  <v-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Language</th>
        <th>Id</th>
        <th>Bio</th>
        <th>Version{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.language }}</td>
        <td>{{ user.id }}</td>
        <td>{{ user.bio }}</td>
        <td>{{ user.version }}</td>
      </tr>
    </tbody>
  </v-table>
  <span>{{ publishedBooksMessage }}</span>
  <p>{{ calculateBooksMessage() }}</p>
  <button @click="author.books2.push(author.name)">TEst</button>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { getUsers } from "@/api";
import { reactive } from "vue";

let users: any = [];

let title = "";

const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
  books2: [] as string[],
  // books3: [] as string[],
});

// a computed ref
const publishedBooksMessage = computed(() => {
  console.log("publishedBooksMessage");
  return author.books.length > 0 ? "Yes" : "No";
});
// in component
function calculateBooksMessage() {
  console.log("calculateBooksMessage");
  return author.books2.length > 0 ? "Yes" : "No";
}

onMounted(() => {
  title = "Title";
  console.log("onMounted");
  getUsers().then((response: any) => {
    console.log(response.data);
    // users = response.data;
  });
});
</script>
