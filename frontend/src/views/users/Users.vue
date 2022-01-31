<template>
  <div class="container mt-4">
    <h4 class="mb-2">Usuarios</h4>
    <router-link to="/usuarios/crear-nuevo" class="btn btn-outline-primary mb-4">Agregar</router-link>
    <table class="table">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Puntos acumulados</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user._id"
        >
          <td>{{ user._id }}</td>
          <td>{{ user.name }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.accumulatedPoints }}</td>
          <td>
            <router-link :to="`/usuarios/${user._id}/puntos`" class="btn btn-outline-info mx-2">
              <span>Puntos</span>
              <svg style="width: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </router-link>
            <button
              @click="deleteUser(user._id)"
              class="btn btn-outline-danger"
            >
              <svg style="width: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { User } from '../../model/user';

export default defineComponent({
  name: "Usuarios",
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

    async deleteUser(id: string){
      if(confirm('Estas seguro de eliminarlo?')){
        await axios.delete(`users/${id}`);
        this.users = this.users.filter((user: any) => user._id !== id);
      }
    }
  },
  async mounted() {
    await this.getUsers();
  },
});
</script>