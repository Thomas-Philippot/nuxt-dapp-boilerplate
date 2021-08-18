<template>
  <div>
    <h1>Hello world!</h1>
  </div>
</template>

<script>
import Web3 from 'web3'
import walletMixins from '../mixins/walletMixins'

export default {
  name: 'Index',
  mixins: [walletMixins],
  created() {
  }
}
</script>
