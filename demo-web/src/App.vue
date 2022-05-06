<template>
  <div style="width: 100%; display: flex" v-if="!formOpen">
    <button 
    @click="formOpen = !formOpen"
    style="align: flex-start"
    class="new-button"
    >New Supervisor</button>
  </div>
  <Dialog
    @on-submit="sendData"
    v-else
  ></Dialog>

  <h3
    :style="message === 'success' ? 'color:green' :'color:red'"
    class="w-full align-left"
    v-if="message.length > 0"
  >
    {{message}}
  </h3>
  
  <table>
    <tr>
      <th>ID</th>
      <th>Jurisdiction</th>
      <th>Name</th>
      <th>Phone</th>
    </tr>
    <tr
      v-for="person in people"
      :key="person.id"
    >
      <td>{{ person.id }}</td>
      <td>{{ person.jurisdiction }}</td>
      <td>{{ person.firstName }} {{person.lastName}}</td>
      <td>{{ person.phone}}</td>
    </tr>
  </table>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Dialog from './components/Dialog.vue';

const people = ref([]);
const formOpen = ref(false);
const message = ref('');

const sendData = (newSupervisor) => {
  formOpen.value = false;
  axios.post(`http://localhost:3000/api/submit`,newSupervisor)
  .then(() => {
    message.value="success";
  })
  .catch((resp) => {
    console.error('error submitting supervisor >> ', resp);
    message.value = 'error submitting supervisor >> ' + resp.response.data;
  });
}

axios.get(`http://localhost:3000/api/supervisors`)
  .then((resp) => {
    console.log(resp);
    people.value = resp.data
  })
  .catch((resp) => console.error('error getting supervisors >> ', resp));

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.new-button{
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  background-color: #6a7f85;
  color: white;
}
</style>
