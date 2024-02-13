# CRYPTOGUARD: health insurance system


CryptoGuard is a decentralized application on the Internet Computer (ICP) blockchain that stores health insurance policies and holds/releases funds based on the outcome of policy evaluation by smart contracts

```bash
    # contract location
    src/backend/index.ts
```

## Deployment
# reqired installs
- IC SDK: https://internetcomputer.org/docs/current/developer-docs/getting-started/install/
 
- node.js

# run
```bash
    # Get all required node.js packages
    npm install
```
```bash
    # Start the local ICP replica
    dfx start --background
```
```bash
    # Local deploy
    dfx deploy
```
``` bash
    # In terminal contract Tests and interactions

    # Add insurance holder to blockchain
    dfx canister call crypto_guard addInsurance "Serem" 100000

    # Get back all insurance holders
    dfx canister call crypto_guard getAllInsurances
```


