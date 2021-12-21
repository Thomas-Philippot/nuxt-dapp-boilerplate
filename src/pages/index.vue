<template>
	<div>
    <h1>Hello world!</h1>
    <nuxt-link v-if="$store.state.eth.connected" to="/TodoList">Todo</nuxt-link>
  </div>
</template>

<script>
import walletMixins from '../mixins/walletMixins'

export default {
	name: 'Index',
	mixins: [walletMixins],
	created() {}
}
</script>
