# ethstorage-sdk-ts

Tool for uploading and downloading data for EthStorage network, utilizing the [EIP-5018](https://eips.ethereum.org/EIPS/eip-5018) standard for data.

## Installation

With [npm](https://www.npmjs.com/package/ethstorage-sdk-ts) do

```bash
npm install ethstorage-sdk-ts
pnpm install ethstorage-sdk-ts
```

## Example

### Constructor

Init SDK

```typescript

import { EthStorageNode as EthStorage } from "ethstorage-sdk-ts";

const rpc = "https://rpc.sepolia.org";
const privateKey =  "0xabcd...";
const ethStorage = new EthStorage(rpc, privateKey);
```

### Deploy

Deploy the implementation contract [FlatDirectory](https://github.com/ethstorage/evm-large-storage/blob/master/contracts/examples/FlatDirectory.sol) for EIP-5018 standard.

```typescript
// EthStorage Contract is the contract address where EthStorage is deployed on Layer 1.
const ethStorageContract = "0x804C520d3c084C805E37A35E90057Ac32831F96f";
await ethStorage.deploy(ethStorageContract);

```

Sepolia network can invoke the following methods:

```typescript
await ethStorage.deploySepolia();
```

If FlatDirectory has already been deployed, you can set it.

```typescript
const rpc = "https://rpc.sepolia.org";
const privateKey =  "0xabcd...";
const flatDirectory = "0xdcba...";

const ethStorage = new EthStorage(rpc, privateKey, flatDirectory);
```

### Upload

Upload files to FlatDirectory.

You can set the file or folder path, and if it is a browser environment, you can also set the file object.

```typescript
const fileOrPath = "/users/dist/test.txt";

await ethStorage.upload(fileOrPath);
```

If you want to upload data, use 'uploadData'

```typescript
const fileName = "test.txt";
const filePath = "/users/dist/test.txt";
const data = fs.readFileSync(filePath);

await ethStorage.uploadData(fileName, data);
```

### Download

Download data from the EthStorage network.

```typescript
// Since the data is downloaded from ethstorage, the provided RPC should be an ethstorage RPC.
const ethStorageRpc = "https://ethstorage.rpc.io";
const fileName = "test.txt";

const data = await ethStorage.download(fileName, ethStorageRpc);
```

or

```typescript
// Since the data is downloaded from ethstorage, the provided RPC should be an ethstorage RPC.

import { Download } from "ethstorage-sdk-ts";

const flatDirectory = "0xdcba...";
const ethStorageRpc = "https://ethstorage.rpc.io";
const fileName = "test.txt";

const data = await Download(ethStorageRpc, flatDirectory, fileName);
```
