<template>
  <div v-if="messages.length" class="messages">
    <ul>
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppMessages",
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.messages {
  background-color: #ffdddd;
  border: 1px solid #ffaaaa;
  padding: 10px;
  margin-bottom: 10px;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
  