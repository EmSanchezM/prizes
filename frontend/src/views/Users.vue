<template>
  <div class="mt-4">
    <h4 class="mb-2">Usuarios</h4>
    <button class="btn btn-outline-primary mb-4">Agregar</button>
    <table class="table">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
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
          <td>
            <button
              :href="`/users/${user._id}/editar`"
              class="btn btn-outline-info mx-2"
            >
              Editar
            </button>
            <button
              class="btn btn-outline-danger"
            >
              Borrar
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
  name: "Usuarios",
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    const { data } = await axios.get("/users");
    console.log(data);
    this.users = data.users;
  },
};
</script>