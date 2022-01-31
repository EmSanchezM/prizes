<template>
  <div class="container mt-4">
    <h4 class="mb-2">Crear Usuario</h4>
    <hr />
    <form @submit.prevent="submitUser">
      <div class="mb-3">
        <label>Nombre</label>
        <input
          v-model="user.name"
          type="text"
          class="form-control"
          placeholder="Nombre del usuario"
        />
      </div>
      <div class="mb-3">
        <label>Apellido</label>
        <input
          v-model="user.lastName"
          type="text"
          class="form-control"
          placeholder="Apellido del usuario"
        />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control"
          placeholder="Email del usuario"
        />
      </div>
      <div class="mb-3">
        <label>Telefono</label>
        <input
          v-model="user.phoneNumber"
          type="text"
          class="form-control"
          placeholder="Telefono"
        />
      </div>
      <div class="mb-3">
        <label>Contraseña</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Asigna una contraseña al usuario"
        />
      </div>
      <div class="mb-3">
        <label>Repita la contraseña</label>
        <input
          v-model="user.passwordConfirm"
          type="password"
          class="form-control"
          placeholder="Repita la contraseña asignada"
        />
      </div>
      <div class="mb-3">
        <label>Fecha de nacimiento</label>
        <input
          v-model="user.birth"
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
  methods: {
    async submitUser() {
      const dataForm = {
        name: this.user.name,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        birth: this.user.birth,
        password: this.user.password,
        passwordConfirmation: this.user.passwordConfirm
      };

      const { data } = await axios.post("users", dataForm);

      if (data.ok) {
        await this.$router.push("/usuarios");
      }
      
    },
  },
};
</script>
