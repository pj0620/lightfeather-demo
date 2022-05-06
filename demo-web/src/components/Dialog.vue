<template>
  <div class="grey-out"></div>
  <div class="center-above">
    <div class="w-full dialog-header" style="border-bottom: 2px white;">
      <span>
        Notification Form
      </span>
    </div>

    <div class="w-full mt-3 flex-row" 
      v-for="detail in details"
      :key="detail.key"
    >
      <div class="w-full mx-3" style="display: flex; justify-content: space-between;">
        <label :for="detail.key">{{detail.label}}</label>
        <input type="text" class="w-50" :name="detail.key" :id="detail.key" v-model="detail.value">
      </div>
    </div>

    <button
      class="mt-3 submit-button"
      @click="submit"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
  import { defineEmits, reactive } from 'vue';

  const details = reactive([
    { label: 'First Name', key: 'firstName', value: '' },
    { label: 'Last Name', key: 'lastName', value: '' },
    { label: 'Email', key: 'email', value: ''  },
    { label: 'Phone Number', key: 'phone', value: ''  },
    { label: 'Supervisor', key: 'supervisor', options: [], value: '' }
  ]);

  const emit = defineEmits(['on-submit']);

  const submit = () => {
    const newSupervisor = {};
    details.forEach(d => newSupervisor[d.key] = d.value);
    emit('on-submit', newSupervisor);
  }
</script>

<style scoped>
.center-above {
  position: fixed;
  top: 25%;
  left: 25%;
  z-index: 2000;
  width:60%;
  height:60%;
  background: rgba(78, 82, 84, 1);
}

.dialog-header {
  text-align: center;
  color:black;
  background: #6a7f85;
}

.grey-out {
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 1000;
}

.mt-3 {
  margin-top: 2.5rem;
}

.flex-row {
  display: flex;
}

.mx-3 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

label {
  color: white;
}

.submit-button{
  padding: 1rem;
  font-size: 1.5rem;
}
</style>