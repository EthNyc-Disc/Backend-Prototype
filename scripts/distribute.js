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



async function query_chain () {
    
    try {
        let fetch_version = connection_status()
        const given_contract = prompt('Contract Address to Query: ')
        let contract_check = web3.utils.isAddress(given_contract)
        if (contract_check === false) {
            console.log(`${given_contract} was not a valid contract`)
        } else {
            // await create_transaction()
            /*
            let real_addresses = web3.eth.getPastLogs(given_contract)
            if (real_addresses.length === 0) {
                console.log('There was an error with the contract')
            } else {
                
                let real_addresses_idx = 0 
                let holder_addresses = []
                for (real_addresses_idx; real_addresses_idx <= real_addresses.length; real_addresse_idx++) {
                    const trans_dict = real_addresses[real_addresses_idx]
                    holder_address = trans_dict['address']
                    holder_addresses.push(holder_address)
                }
                
            }*/
            
            var addresses = ['0x52fA3cD7C8926CF515a454658A27d710CF447b2f', '0x127a95027B5c7E1D807433837C9cDD7e6f336803']

            while (true) {
                let user_prompt = prompt(': ')
                if (user_prompt === 'send_message') {
                    await broadcast_message(addresses)
                } else if (user_prompt == 'fetch') {
                    var user_user_address = prompt('Wallet Address: ')
                    await fetch_notifications(user_user_address)

                }
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
    const epnsSDK = new EpnsSDK('0x5a5d6c906d34abb44538ede840ad3557911813e09944b01b10dab4a8e4cfa03f')
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

// query_chain()

async function fetch_data(chainId, address, api_key, baseURL) {
    const url = new URL(`${baseURL}/${chainId}/tokens/${address}/token_holders/?key=${api_key}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    console.log(data)
    return data;
}


async function query_chain() {
    const baseURL = 'https://api.covalenthq.com/v1'
    const chainId = '1'
    const given_contract = prompt('Contract Address to Query: ')
    const api_key = 'ckey_d6591b5b3a29491dba00f3d9297'
    array = await fetch_data(chainId, given_contract, api_key, baseURL)
    console.log(array)
}


query_chain()