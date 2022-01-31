<template>
  <div class="container mt-4">
    <h4>Canjear premios</h4>
    <div class="row alig-items-center">
      <div class="col mt-4" v-for="user in users" :key="user._id">
        <div class="card rounded">
          <div class="card-body text-center">
            <h5 class="card-title text-capitalize">{{ user.name }} {{ user.lastName }}</h5>
            <h6 class="card-subtitle mb-2">Información Personal</h6>
            
            <p class="card-text">
              Telefono: 
              {{ user.phoneNumber }} 
              <br>
              Email: {{ user.email }}
            </p>
            <p class="card-footer fw-bold">
              {{ user.accumulatedPoints }} Puntos acumulados
            </p>
            <router-link :to="`/canjear-premios/${user._id}`" class="btn btn-primary">Canjear premio</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { User } from '../../model/user';

export default defineComponent({
  name: "Exchanges",
  data() {
    return {
      users: [] as User[],
    };
  },
  methods: {
    async getUsers(){
      const { data } = await axios.get('users');
      this.users = data.users;
    },
  },
  async mounted() {
    this.getUsers();
  },
});
</script>