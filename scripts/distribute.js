import Web3 from 'web3'           
const web3 = new Web3(Web3.givenProvider || 'https://eth-goerli.gateway.pokt.network/v1/lb/62b7830e123e6f003984c794') // Pokt Integration
import promptSync from 'prompt-sync';
const prompt = promptSync()

import EpnsSDK from '@epnsproject/backend-sdk-staging';
import { api, utils } from "epnsproject/frontend-sdk-staging"; 

const connection_status = () => {
    const result = web3.version
    return result
}


/* async function create_transaction (){
    const tx1 = await web3.eth.sendTransaction({
    from: '0xec2a636B21E2935897DB0D779A66221A82B4fd02',
    to:'0x127a95027B5c7E1D807433837C9cDD7e6f336803',
    value: '50000000'
    })

    console.log(tx1)
} */

async function query_chain () {
    let rel_contract = undefined
    try {
        let fetch_version = connection_status()
        const given_contract = prompt('Contract Address to Query: ')
        rel_contract = given_contract
        let contract_check = web3.utils.isAddress(given_contract)
        if (contract_check === false) {
            console.log(`${given_contract} was not a valid contract`)
        } else {
            // await create_transaction()
            /*let real_addresses = web3.eth.getPastLogs(given_contract)
            if (real_addresses.length === 0) {
                console.log('There was an error with the contract')
            } else {
                
                let real_addresses_idx = 0 
                holder_addresses = []
                for (real_addresses_idx; real_addresses_idx <= real_addresses.length; real_addresse_idx++) {
                    trans_dict = real_addresses[real_addresses_idx]
                    holder_address = trans_dict['address']
                    holder_addresses.push(holder_addresses)
                }
                
            }
            */

            const sample_addresses = ['0x127a95027B5c7E1D807433837C9cDD7e6f336803', '0x2b02CdeD4C5Cc09455A4630d95556025CBe8991d']
                        // Sample Addresses were needed to be made due to no smart contracts being on Goerli
            // The Conditional above would not work
            while (true) {
                let user_prompt = prompt(': ')
                if (user_prompt === 'send_message') {
                    await broadcast_message(sample_addresses)
                } else if (user_prompt == 'fetch') {
                    var user_user_address = prompt('Wallet Address: ')
                    await fetch_notifications(user_user_address)

                }
            }


            
            
        
            
        }


    //}
    } catch (err) {
        console.log(`${rel_contract} is not a valid address`)
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
    const epnsSDK = new EpnsSDK (
        {
            channelKey: process.env.PRIVATE_KEY,
            channelAddress: process.env.WALLET_ADDRESS,
            notificationChainId: DEFAULT_NOTIFICATION_CHAIN
    })
    message_title = prompt('Title of Message: ')
    message_data = prompt('Message you want to Broadcast: ')
    
    let address_idx = 0
    for (address_idx; address_idx <= addresses.length; address_idx++) {
        current_address = addresses[address_idx]
        
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

query_chain()