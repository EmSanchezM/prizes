<template>
  <div>
    <table class="table">
      <template>
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
            v-for="user in users.slice((page - 1) * perPage, page * perPage)"
            :key="user._id"
          >
            <td>{{ user._id }}</td>
            <td>{{ user.name }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button
                :href="`/users/${user._id}/editar`"
                class="btn-outline-primary"
              >
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </template>
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
    const { data } = await axios.get("users");
    console.log(data);
    this.users = data.users;
  },
};
</script>