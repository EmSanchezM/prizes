<template>
  <div class="mt-4">
    <h4>Premios</h4>
    <button class="btn btn-outline-primary mb-4">Agregar</button>
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
            <button
              :href="`/premios/${prize._id}/editar`"
              class=" btn btn-outline-warning mx-2"
            >
              <span class="text-center">Editar</span>
            </button>
            <button
              class=" btn btn-outline-danger"
            >
              <span class="text-center">Eliminar</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Premios",
  data() {
    return {
      prizes: [],
    };
  },
  async mounted() {
    const { data } = await axios.get("/prizes");
    console.log(data);
    this.prizes = data.prizes;
  },
};
</script>