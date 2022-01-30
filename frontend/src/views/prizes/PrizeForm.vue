<template>
  <div class="container mt-4">
    <h4 class="mb-2">Crear Premio</h4>
    <hr />
    <form @submit.prevent="submitPrize">
      <div class="mb-3">
        <label>Nombre</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Nombre del premio"
        />
      </div>
      <div class="mb-3">
        <label>Descripcion</label>
        <input
          v-model="description"
          type="text"
          class="form-control"
          placeholder="Descripcion del premio"
        />
      </div>
      <div class="mb-3">
        <label>Puntos</label>
        <input
          v-model="points"
          type="text"
          class="form-control"
          placeholder="Puntos"
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
  name: "PrizeForm",
  data() {
    return {
      prize: {
        name: "",
        description: "",
        points: 0,
      },
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      const { data } = await axios.get(`prizes/${this.$route.params.id}`);

      this.name = data.prize.name;
      this.description = data.prize.description;
      this.points = data.prize.points;
    }
  },
  methods: {
    async submitPrize() {
      const dataForm = {
        name: this.prize.name,
        description: this.prize.description,
        points: this.prize.points,
      };

      console.log(this.$route.params.id);

      if (this.$route.params.id) {
        const { data } = await axios.put(
          `prizes/${this.$route.params.id}`,
          dataForm
        );

        if (data.ok) {
          await this.$router.push("/premios");
        }
      } else {
        const { data } = await axios.post("prizes", dataForm);

        if (data.ok) {
          await this.$router.push("/premios");
        }
      }
    },
  },
};
</script>
