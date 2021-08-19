<template>
  <div>
    <v-row>
      <v-col>
        <h1>Hello world!</h1>
        <p>You can use ETH to change the value into the contract</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2">
        <v-text-field label="Amout" type="number" v-model="amount" />
      </v-col>
      <v-col>
        <v-btn @click="setSimpleStorage">
          Send
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="connected">
      <v-col>
        <v-card>
          <v-card-title>
            Contract
          </v-card-title>
          <v-card-text>
            SimpleStorage : {{ simpleStorage }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Web3 from 'web3'
import walletMixins from '../mixins/walletMixins'

export default {
  name: 'Index',
  mixins: [walletMixins],
  data () {
    return {
      amount: 0,
      simpleStorage: 'Toto'
    }
  },
  created() {
    let interval = setInterval(() => {
      this.$store.dispatch('eth/simpleStorageGet').then((data) => {
        console.log(data)
        this.simpleStorage = data
      })
    }, 100);
  },
  methods: {
    setSimpleStorage() {
      this.$store.dispatch('eth/simpleStorageSet', this.amount)
    }
  }
}
</script>
