const Web3 = require('web3')         
const web3 = new Web3(Web3.givenProvider || 'https://eth-goerli.gateway.pokt.network/v1/lb/62b7830e123e6f003984c794') // Pokt Integration
const prompt = require('prompt-sync')()
require('dotenv').config();
const EpnsSDK = require("@epnsproject/backend-sdk-staging").default;
const fetch = require('node-fetch');
// import { api, utils } from "@epnsproject/frontend-sdk-staging"; 

const connection_status = () => {
    const result = web3.version
    return result
}

// id, contract_add, Notification Title, Notification Message
let data = []

const inputNetwork = document.getElementById("network")
const inputNftAddress = document.getElementById("input-nft-address")
const inputNotificationTitle = document.getElementById("input-notification-title")
const inputNotificationBody = document.getElementById("input-notification-body")
const sendBtn = document.getElementById("send-btn")
let ackSend = document.getElementById("ack-send")
const note = "Notified"

async function main() {
    try {
        let fetch_version = connection_status()
        var addresses = await filter_accounts(user_network, contract_address)
        await broadcast_message(addresses, notification_title, notification_message)

    } catch (err) {
        console.log('There was an error loggin Web3')
    }
}

sendBtn.addEventListener("click", function() {
    data = []
    data.push(inputNetwork.value)
    data.push(inputNftAddress.value)
    data.push(inputNotificationTitle.value)
    data.push(inputNotificationBody.value)
    console.log(data)
    ackSend.innerText = data
    user_network = data[0]
    contract_address = data[1]
    notification_title = data[2]
    notification_message = data[3]
    console.log(notification_message)

    main()




})

async function fetch_data(chainId, address, api_key, baseURL) {
    const url = new URL(`${baseURL}/${chainId}/tokens/${address}/token_holders/?key=${api_key}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    return data;
}

async function query_chain(network, contract_address) {
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
    
        const given_contract = contract_address   
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


async function filter_accounts (network, contract_address) {
    const transactions = await query_chain(network, contract_address)
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



async function broadcast_message (addresses, notification_title, notification_message) {
    const CHANNEL_PK = process.env.PRIVATE_KEY
    const epnsSDK = new EpnsSDK(process.env.PRIVATE_KEY)
    const message_title = notification_title
    const message_data = notification_message
    
    
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

    console.log(`${message_data} under topic: ${message_title} has been successfully sent`)
    
}