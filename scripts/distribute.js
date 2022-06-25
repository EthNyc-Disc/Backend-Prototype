const Web3 = require('web3')            // Pokt Integration
const web3 = new Web3(Web3.givenProvider || 'https://eth-goerli.gateway.pokt.network/v1/lb/62b7830e123e6f003984c794')
var prompt = require('prompt-sync')();


const connection_status = () => {
    result = web3.version
    return result
}


const sample_addresses = ['0x127a95027B5c7E1D807433837C9cDD7e6f336803', '0xec2a636B21E2935897DB0D779A66221A82B4fd02', '0x2b02CdeD4C5Cc09455A4630d95556025CBe8991d']
// Sample Addresses were needed to be made due to no smart contracts being on Goerli

/* async function create_transaction (){
    const tx1 = await web3.eth.sendTransaction({
    from: '0xec2a636B21E2935897DB0D779A66221A82B4fd02',
    to:'0x127a95027B5c7E1D807433837C9cDD7e6f336803',
    value: '50000000'
    })

    console.log(tx1)
} */

async function query_chain () {
    try {
        let fetch_version = connection_status()
        const given_contract = prompt('Contract Address to Query: ')
        let contract_check = web3.utils.isAddress(given_contract)
        if (contract_check === false) {
            console.log(`${given_contract} was not a valid contract`)
        } else {
            // await create_transaction()
            console.log('In the else loop')
            
            
            
        }



    } catch (err) {
        console.log('There seems to be a node connection error')
    }
    


}


query_chain()