<template>
  <div class="container mt-4">
    <h4>Premios</h4>
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <router-link to="/premios/crear-nuevo" class="btn btn-outline-primary mb-4">Agregar</router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Premio</th>
          <th class="text-left">Puntos</th>
          <th class="text-left">Descripcion</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prize in prizes"
          :key="prize._id"
        >
          <td>{{ prize._id }}</td>
          <td>{{ prize.name }}</td>
          <td>{{ prize.points }}</td>
          <td>{{ prize.description }}</td>
          <td>
            <router-link
              :to="`/premios/${prize._id}/editar`"
              class=" btn btn-outline-warning mx-2"
            >
              <svg style="width: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </router-link>
            <button
              @click="deletePrize(prize._id)"
              class=" btn btn-outline-danger"
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
import { Prize } from '../../model/prize';

export default defineComponent({
  name: "Premios",
  data() {
    return {
      prizes: [] as Prize[],
    };
  },
  methods: {
    async getPrizes(){
      const { data } = await axios.get('prizes');
      this.prizes = data.prizes;
    },

    async deletePrize(id: string){
      if(confirm('Estas seguro de eliminarlo?')){
        await axios.delete(`prizes/${id}`);
        this.prizes = this.prizes.filter((prize: any) => prize._id !== id);
      }
    }
  },
  async mounted() {
    this.getPrizes();
  },
});
</script>