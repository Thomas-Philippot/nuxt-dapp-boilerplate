// import web3Abi from 'web3-eth-abi'

// const tokenAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10' // insert deployed EIP20 token address here
// const eip20 = new web3.eth.Contract(EIP20.abi, tokenAddress)
import SimpleStorage from '../../build/contracts/SimpleStorage'
import Web3 from 'web3'

let simpleStorage;

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
  async connect ({ commit }) {
    if (process.browser) {
      if (window.ethereum) {
        // Use Mist/MetaMask's provider
        // window.ethereum
        // const web3js = new Web3('http://localhost:9545');
        await window.ethereum.send('eth_requestAccounts')
        window.web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        commit('setAccount', accounts[0])
        const balance = await web3.eth.getBalance(accounts[0])
        commit('setEthBalance', balance)
        commit('setConnected', true)

        registerSimpleStorage()

        window.ethereum.on('accountsChanged', (accounts) => {
          // user disconnected is account
          if (typeof accounts[0] === 'undefined') {
            commit('setConnected', false)
          }
          commit('setAccount', accounts[0])
          web3.eth.getBalance(accounts[0]).then((balance) => {
            commit('setEthBalance', balance)
          })
        })

      } else {
        commit('setConnected', false)
      }
    }
  },
  simpleStorageSet({ state }, value) {
    if (typeof simpleStorage !== 'undefined') {
      simpleStorage.methods.set(value).send({from: state.account})
    }
  },
  simpleStorageGet() {
    if (typeof simpleStorage !== 'undefined') {
      return simpleStorage.methods.get().call()
    }
  }
}

export const getters = {}

function registerSimpleStorage() {
  simpleStorage = new web3.eth.Contract(SimpleStorage.abi, process.env.SIMPLE_STORAGE_CONTRACT_ADDRESS)
}
