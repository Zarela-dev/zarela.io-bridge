## Zarela Bridge Service
Due to technical shortcomings in unity, some features such an encryption and decryption of messages are not available as of yet. The bridge service is a temporary solution to overcome these limitations.

### Services
right now there are 3 services provided by the bridge service:

1. encryption public key retrieval
2. contribution inbox (decryption using Metamask API)
3. contribution on Zarela smart contract

### How to use services
there are 3 pages available to use the services:

1. [Encryption Public Key Retrieval](https://bridge.zarela.io/getEncryptionKey)
2. [Inbox](https://bridge.zarela.io/inbox)
3. [Contribution](https://bridge.zarela.io/contribute)

first 2 are rather straightforward and user can work with them as soon as they connect with their Metamask wallet.
contribution however, requires 2 parameters passed in as query parameters:
`
https://bridge.zarela.io/contribute?requestId={requestId}&zarelaBusinessId={busnessId}
`
##### requestId:
the `id` of the request that user wants to contribute to.

##### zarelaBusinessId:
the `id` of the business that the request is available on.
**a list of reserved business IDs are available [here]()**


### Supported Wallets
Since `eth_decrypt` and `eth_getEncryptionPublicKey` are only available in Metamask, currently we only fully support Metamask wallet.
