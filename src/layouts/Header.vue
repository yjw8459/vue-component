<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      Vuetify
    </v-app-bar-title>
    <v-btn ref="goMain" href="/">Home</v-btn>
    <v-btn ref="goFirst" href="/first">First</v-btn>
    <v-btn ref="goSecond" href="/second">Second</v-btn>
    <v-btn ref="goOrder" href="/order">Order</v-btn>
  </v-app-bar>
  <!-- <v-app-bar title="Application bar"></v-app-bar> -->
</template>
<script lang="ts" setup></script>
