<template>
  <div class="container mt-4">
    <h4 class="mb-2">Asignar Puntos a Usuario</h4>
    <hr />
    <form @submit.prevent="submitPoints">
      <div class="mb-3">
        <label>Puntos</label>
        <input
          v-model="quantityPoints"
          type="number"
          class="form-control"
          placeholder="Cantidad de puntos a asignar"
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
  name: "PointsForm",
  data() {
    return {
      quantityPoints: 0
    };
  },
  methods: {
    async submitPoints() {

       if (this.$route.params.id) {
        const { data } = await axios.put(`users/${this.$route.params.id}/points`, { quantityPoints: this.quantityPoints });

        if (data.ok) {
          await this.$router.push("/usuarios");
        }
      }
    },
  },
};
</script>
