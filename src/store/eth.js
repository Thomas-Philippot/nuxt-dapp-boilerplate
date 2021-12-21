// import web3Abi from 'web3-eth-abi'

// const tokenAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10' // insert deployed EIP20 token address here
// const eip20 = new web3.eth.Contract(EIP20.abi, tokenAddress)
import Web3 from 'web3'

export const state = () => ({
  connected: false,
  account: null,
  ethBalance: null,
})

export const mutations = {
  setConnected(state, value) {
    state.connected = value
  },
  setAccount(state, value) {
    state.account = value
  },
  setEthBalance(state, value) {
    state.ethBalance = web3.utils.fromWei(value, 'ether')
  }
}

export const actions = {
  async connect({commit}) {
    if (process.browser) {
      if (window.ethereum) {
        // Use Mist/MetaMask's provider
        // window.ethereum
        // const web3js = new Web3('http://localhost:9545');
        await window.ethereum.send('eth_requestAccounts')
        window.web3 = new Web3(window.ethereum)
        await web3.eth.getAccounts().then(res => {
          commit('setAccount', res[0])
          web3.eth.getBalance(res[0]).then(balance => {
            commit('setEthBalance', balance)
          })
        })
        commit('setConnected', true)

        window.ethereum.on('accountsChanged', accounts => {
          // user disconnected is account
          if (typeof accounts[0] === 'undefined') {
            commit('setConnected', false)
          }
          commit('setAccount', accounts[0])
          web3.eth.getBalance(accounts[0]).then(balance => {
            commit('setEthBalance', balance)
          })
        })
      } else {
        commit('setConnected', false)
      }
    }
  },
  loadContract({ rootState, dispatch, state }, name) {
    if (process.browser && window.ethereum && state.connected) {
      const abi = rootState[name].abi.abi
      const contractAddess = rootState[name].address
      const contract = new web3.eth.Contract(abi, contractAddess)
      dispatch('initializeContract', { module: name, value: contract }, { root: true })
    }
  }
}

export const getters = {}
