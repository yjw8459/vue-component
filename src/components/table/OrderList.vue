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
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { getUsers } from "@/api";

let users: any = [];

let title = "";

onMounted(() => {
  title = "Title";
  console.log("onMounted");
  getUsers().then((response: any) => {
    console.log(response.data);
    // users = response.data;
  });
});
</script>
