## Zarela Bridge Service

Due to technical shortcomings in unity, some features such an encryption and decryption of messages are not available as of yet. The bridge service is a temporary solution to overcome these limitations.

### Services

right now there are 4 services provided by the bridge service:

1. encryption public key retrieval
2. contribution inbox (decryption using Metamask API)
3. contribution on Zarela smart contract
4. create new request

### How to use services:

these are the pages available for each service:

- [Encryption Public Key Retrieval](https://bridge.zarela.io/getEncryptionKey)
`https://bridge.zarela.io/getEncryptionKey`
- [Inbox](https://bridge.zarela.io/inbox)
`https://bridge.zarela.io/inbox`
- [Contribution](https://bridge.zarela.io/contribute)
`https://bridge.zarela.io/contribute`
- [Create Request](https://bridge.zarela.io/createRequest) **(WIP)**
`https://bridge.zarela.io/createRequest`

### Parameters:

here are the parameters that are required to use the services:

#### Encryption Public Key Retrieval
return value: `{"encryptionPublicKey":"[encryptionPublicKey]"}`
#### Contribution

query example:
`https://bridge.zarela.io/contribute?requestId={requestId}`

**`requestId`**: the `id` of the request that user wants to contribute to.
these parameters are required to contribute using this service:


#### Create Request

these properties should be passed as query parameters to create a request:
**sample encoded URL:**
`https://brdige.zarela.io/newRequest?title=sample%20title%20with%20spaces&desc=sample%20description&angelWage=555.154&hubWage=88996.123456789&rewardable=angel&requiredContributions=444000&categories=EEG,ECG,some%20other%20category&zpaper=QmapYt3QDxyK3kKJ5L7bFrmpXAFeKsUkzvQpAZUHekDAuT&businessId=342`

**decoded sample:**
`https://brdige.zarela.io/newRequest?title=sample title with spaces&desc=sample description&angelWage=555.154&hubWage=88996.123456789&rewardable=angel&requiredContributions=444000&categories=EEG,ECG,some other category&zpaper=QmapYt3QDxyK3kKJ5L7bFrmpXAFeKsUkzvQpAZUHekDAuT&businessId=342`

| Parameter                 | required | Default value | Description                                                                     |
| ------------------------- | -------- | ------------- | ------------------------------------------------------------------------------- |
| **title**                 | Yes      | -             | title of the request                                                            |
| **desc**                  | Yes      | -             | short description of the request                                                |
| **angelWage**             | Yes      | 0             | the amount of wage that angel will receive per contribution in BBIT\*           |
| **hubWage**               | Yes      | 0             | the amount of wage that hub will receive per contribution in BBIT\*             |
| **rewardable**            | Yes      | `angel`       | the party who receives the reward, `angel` or `hub`.                            |
| **requiredContributions** | Yes      | 0             | quantity of contributions required                                              |
| **categories**            | Yes      | -             | a comma separated list of categories related to this request e.g. `foo,bar,baz` |
| **zpaper**                | Yes      | -          | `CID` of the uploaded Zpaper on IPFS                                            |
| **businessId**            | Yes      | -          | Business ID on which this request is supposed to be placed                      |

\*BBIT: up to 9 decimals and less than 2000000

note: a list of reserved business IDs will be available soon but for now, you can see the reserved IDs here:
| business | ID | Description | Website |
| --- | --- | --- | --- |
| Zarela Webapp | 1 | A peer to peer data platform for trading biosignals on the blockchain network. | [Link](https://app.zarela.io)
| Zarela Bioverse | 2 | Zarela Bioverse | [Link](https://zarela.io/bioverse)

---
### Supported Wallets

Since `eth_decrypt` and `eth_getEncryptionPublicKey` are only available in Metamask, currently we only fully support Metamask wallet.
