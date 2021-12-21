<template>
  <v-app-bar
      app
  >
    <v-toolbar-title>My Dapp</v-toolbar-title>
    <nuxt-link to="/">App</nuxt-link>
    <v-spacer />
    <v-btn v-if="!connected" rounded outlined @click="connect">
      Connect
      <v-icon right>
        fa-wallet
      </v-icon>
    </v-btn>
    <div v-else>
      <v-row align="center" no-gutters>
        <v-col>
          <v-chip
              class="ma-2"
              color="secondary"
              outlined
          >
            <v-icon left>
              fab fa-ethereum
            </v-icon>
            {{ ethBalance }} ETH
          </v-chip>
        </v-col>
        <v-col>
          <v-btn rounded color="primary">
            <div class="mr-2">
              {{ trimmedAccount }}
            </div>
            <status-indicator status="positive" pulse />
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>

<script>
import walletMixins from '../mixins/walletMixins'
import { StatusIndicator } from 'vue-status-indicator'

export default {
  name: 'Appbar',
  mixins: [walletMixins],
  components: {
    StatusIndicator
  },
  methods: {
    connect () {
      this.$store.dispatch('eth/connect')
    }
  }
}

</script>
