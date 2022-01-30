<template>
  <div class="container mt-4">
    <h4 class="mb-2">Crear Usuario</h4>
    <hr />
    <form @submit.prevent="submituser">
      <div class="mb-3">
        <label>Nombre</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Nombre del usuario"
        />
      </div>
      <div class="mb-3">
        <label>Apellido</label>
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          placeholder="Apellido del usuario"
        />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Email del usuario"
        />
      </div>
      <div class="mb-3">
        <label>Telefono</label>
        <input
          v-model="phoneNumber"
          type="text"
          class="form-control"
          placeholder="Telefono"
        />
      </div>
      <div class="mb-3">
        <label>Fecha de nacimiento</label>
        <input
          v-model="birth"
          type="date"
          class="form-control"
          placeholder="Fecha de nacimiento"
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-outline-info">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserForm",
  data() {
    return {
      user: {
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
        birth: "",
      },
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      const { data } = await axios.get(`users/${this.$route.params.id}`);

      this.name = data.user.name;
      this.lastName = data.user.lastName;
      this.email = data.user.email;
      this.phoneNumber = data.user.phoneNumber
    }
  },
  methods: {
    async submitUser() {
      const dataForm = {
        name: this.user.name,
        lastName: this.user.lastName,
        email: this.user.email,
      };

      console.log(this.$route.params.id);

      if (this.$route.params.id) {
        const { data } = await axios.put(
          `users/${this.$route.params.id}`,
          dataForm
        );

        if (data.ok) {
          await this.$router.push("/usuarios");
        }
      } else {
        const { data } = await axios.post("users", dataForm);

        if (data.ok) {
          await this.$router.push("/usuarios");
        }
      }
    },
  },
};
</script>
