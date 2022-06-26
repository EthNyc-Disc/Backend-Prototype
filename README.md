# Decentralized Communication 💬

Fractal is a decentralized sos/announcement platform that allows users to contact users of their NFTs! Powered by EPNS, users can now send messages their holders' addresses. 

With Covalent's API, Fractal is able to fetch all token holders based on a desired smart contract either on Ethereum or Polygon.

Fractal allows for large scaled events, like EthNyc, to reach out to their audiences within one second with just one universal NFT rather than making a server on Discord, Slack, etc, which require centralized authority to run communications!

# Functionality 🚀

Covalent's API allows for network query based on smart contracts, which prompts 100 addresses (due to performance sustainability) in the form of the array. Based on the user-inputted smart contract, the resulting array will be looped in `O(n)` time, which would take the user, and with the EPNS Notification Protocol, would send a message (based on what the sender would like to communicate) to the wallet powered by EPNS itself in the form of a notification. 

All smart contracts either on Ethereum or Polygon are compatiable. The user must note them before entering the contract address.

# Sponsors 🤘🏼

Fractal Sponsors Include: EPNS, Covalent, Pocket Network

# Tech Stack 📲
Languages: JS, Python (Prototype Modelling), HTML, CSS
Libaries/SDKs/APIs: Pocket, Web3, Ethers, Covalent, 

# More Information 🗺

The RPC Node is provided by *Pocket Network*. 

Current version is a prototype, but there are some scalability features in mind and planned after EthNyc! 

