<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal text-center">Registro de Usuario</h1>

      <div class="form-floating mb-3">
        <input
          v-model="name"
          class="form-control"
          placeholder="Nombre"
        />
        <label>Nombre</label>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="lastName"
          class="form-control"
          placeholder="Apellido"
        />
        <label>Apellido</label>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label>Correo electronico</label>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Contraseña"
        />
        <label>Contraseña</label>
      </div>

      <div class="form-floating">
        <input
          v-model="passwordConfirm"
          type="password"
          class="form-control"
          placeholder="Confirmar Contraseña"
        />
        <label>Confirmar Contraseña</label>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="phoneNumber"
          type="text"
          class="form-control"
          placeholder="Número de telefono"
        />
        <label>Telefono</label>
      </div>

      <div class="form-floating mb-3">
        <input
          v-model="birth"
          type="date"
          class="form-control"
          placeholder="Fecha de nacimiento"
        />
        <label>Fecha de nacimiento</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Registrarse</button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Registro",
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      birth: ""
    };
  },
  methods: {
    async submit() {
      await axios.post("users", {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        phoneNumber: this.phoneNumber,
        birth: this.birth
      });
      
      await this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>