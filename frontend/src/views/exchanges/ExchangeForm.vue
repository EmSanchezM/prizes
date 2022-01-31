<template>
  <div class="container mt-4">
    <h4>Premios disponibles</h4>
    <div class="row alig-items-center">
      <div class="col mt-4" v-for="prize in prizes" :key="prize._id">
        <div class="card rounded">
          <div class="card-body text-center">
            <h5 class="card-title text-capitalize">
              {{ prize.name }}
            </h5>
            <h6 class="card-subtitle mb-2">Información Personal</h6>

            <p class="card-text">
              
              {{ prize.description }}
            </p>
            <p class="card-footer fw-bold">
              {{ prize.points }} Puntos necesarios
            </p>
            <buttom @click="submitExchanges(prize._id)" class="btn btn-primary"> Asignar premio</buttom>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Prize } from '../../model/prize';

export default {
  name: "ExchangeForm",
  data() {
    return {
      prizes: [] as Prize[],
      user: {
        id: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        accumulatedPoints: 0
      }
    };
  },
  methods: {
    async getPrizes(){
      const { data } = await axios.get('prizes');
      this.prizes = data.prizes;
    },
    async submitExchanges(prizeId: string) {
      let dataForm = {
        userId: this.user.id,
      };

      if (this.$route.params.id) {
        const { data } = await axios.put(
          `prizes/${prizeId}/users`,
          dataForm
        );

        if (data.ok) {
          await this.$router.push("/canjear-premios");
        }
      }
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      const { data } = await axios.get(`users/${this.$route.params.id}`);

      this.user.id = data.user._id;
      this.user.name = data.user.name;
      this.user.lastName = data.user.lastName;
      this.user.phoneNumber = data.user.phoneNumber;
      this.user.email = data.user.email;
      this.user.accumulatedPoints = data.user.accumulatedPoints;
    }
    this.getPrizes()
  },
};
</script>
