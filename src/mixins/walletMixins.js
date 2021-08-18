export default {
  computed: {
    connected () {
      return this.$store.state.eth.connected
    },
    account () {
      return this.$store.state.eth.account
    },
    trimmedAccount () {
      let account = this.$store.state.eth.account
      if (account !== null && typeof account !== 'undefined') {
        return account.substring(0,6) + '...' + account.substring(account.length - 4, account.length)
      }
      return account
    },
    ethBalance() {
      const balance = this.$store.state.eth.ethBalance
      if (balance !== null && balance.includes('.')) {
        return balance.slice(0, balance.length - 6)
      }
      return balance
    }
  },
}
