import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Pokemon from '../abis/Pokemon.json'
const {
  BigNumber
} = require("@ethersproject/bignumber");

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    console.log('networkId', networkId);
    const networkData = Pokemon.networks[networkId]
    console.log('networkData', networkData);
    if(networkData) {
      const abi = Pokemon.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.tokenCounter().call()
      this.setState({ totalSupply })
      
      for (var i = 1; i <= totalSupply; i++) {
        const aPokemon = await contract.methods.attributes(i - 1).call()
        const { tokenURI, name, health, retreat } = aPokemon;
        this.setState({
          pokemon: [...this.state.pokemon, { tokenURI, name, health:  BigNumber.from(health).toString(), retreat: BigNumber.from(retreat).toString()}]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      pokemon: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
          >
            Pokemon Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
            {this.state.pokemon.map((aPokemon, key) => {
              return(
                <div  key={key} className="token-row">
                  <div>
                    <img src={aPokemon.tokenURI}/>
                    <div>Name: {aPokemon.name}</div>
                    <div>HP: {aPokemon.health}</div>
                    <div>Retreat cost: {aPokemon.retreat}</div>
                  </div>
                </div>
              )
            })}
          
        </div>
      </div>
    );
  }
}

export default App;
