const Web3 = require('web3')         
const web3 = new Web3(Web3.givenProvider || 'https://eth-goerli.gateway.pokt.network/v1/lb/62b7830e123e6f003984c794') // Pokt Integration
const prompt = require('prompt-sync')()
require('dotenv').config();
const EpnsSDK = require("@epnsproject/backend-sdk-staging").default;
const ethers = require('ethers');
const fetch = require('node-fetch');
// import { api, utils } from "@epnsproject/frontend-sdk-staging"; 

const connection_status = () => {
    const result = web3.version
    return result
}



async function running () {
    
    try {
        let fetch_version = connection_status()
        var addresses = await filter_accounts()
        
        // var addresses = ['0x52fA3cD7C8926CF515a454658A27d710CF447b2f', '0x127a95027B5c7E1D807433837C9cDD7e6f336803'] // Test Addresses

        while (true) {
            let user_prompt = prompt(': ')
            if (user_prompt === 'send_message') {
                await broadcast_message(addresses)
            } else if (user_prompt == 'fetch') {
                var user_user_address = prompt('Wallet Address: ')
                await fetch_notifications(user_user_address)

            }
        }
            
      //}
    } catch (err) {
        console.log(`Contract is not a valid address`)
        console.log(err)
    }
    

}

async function fetch_notifications (user_address) {
    try {
        const pageNumber = 1;
        const itemsPerPage = 20;
        
        const fetchedNotifications = await api.fetchedNotifications(
            user_address,
            itemsPerPage,
            pageNumber
        )
    
        console.log('----------------Unreads----------------')
        const parsedResponse = utils.parseApiResponse(
            fetchedNotifications
        );
        console.log(parsedResponse)
        console.log('--------------------------------')
    } catch (err) {
        console.log(`${user_address} is not valid`)
    }

}

async function broadcast_message (addresses) {
    const CHANNEL_PK = process.env.PRIVATE_KEY
    const epnsSDK = new EpnsSDK(process.env.PRIVATE_KEY)
    const message_title = prompt('Title of Message: ')
    const message_data = prompt('Message you want to Broadcast: ')
    
    
    let address_idx = 0
    for (address_idx; address_idx <= addresses.length; address_idx++) {
        current_address = addresses[address_idx]
        console.log(current_address)
        
        const tx = await epnsSDK.sendNotification(
            current_address,
            message_title,
            message_data,
            message_title,
            message_data,
            3,
            'www.google.ca',
            '',
            null);
        
    }
    
}

running()


async function fetch_data(chainId, address, api_key, baseURL) {
    const url = new URL(`${baseURL}/${chainId}/tokens/${address}/token_holders/?key=${api_key}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    return data;
}


async function query_chain(network) {
    var chainId = undefined
    var validation = true
    const block_id = {'eth':'1', 'polygon':'137'}
    if (network === 'eth') {
        chainId = block_id['eth'] 
    } else if (network === 'polygon') {
        chainId = block_id['polygon']
    } else {
        console.log('Invalid Network')
        validation = false
    }
    if (validation === true) {
        const baseURL = 'https://api.covalenthq.com/v1'
    
        const given_contract = prompt('Contract Address to Query: ')    
        const contract_verify = web3.utils.isAddress(given_contract)
        if (contract_verify === true) {
            const api_key = process.env.API_KEY
            array = await fetch_data(chainId, given_contract, api_key, baseURL)
            return array
        } else {
            return false
        }
    } else {}

}

async function filter_accounts () {
    var network = prompt('Network of Contract: ')
    const transactions = await query_chain(network)
    if (transactions !== false) {
        let addresses_from_query = []
        let transaction_metadata = transactions['items']
        console.log(transaction_metadata.length)
        let transaction_idx = 0 
        for (transaction_idx; transaction_idx <= transaction_metadata.length; transaction_idx++) {
            let transaction = transaction_metadata[transaction_idx]
            if (transaction !== undefined) {
                const address_filter = transaction['address']
                let contract_check = web3.utils.isAddress(address_filter)
                if (contract_check === true) {
                    console.log(`${address_filter} passed`)
                    addresses_from_query.push(address_filter)
        
                } else {
                    console.log(`${address_filter} was not passed`)
                }
            }
    
        }
    
        return addresses_from_query
    } else {
        console.log('There was an error processing due to invalid contract address')
    }

}


/*async function test() {
    resulting = await filter_accounts()
    console.log(resulting)
}
console.log(test())*/