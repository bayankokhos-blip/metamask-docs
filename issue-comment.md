## Analysis of Missing Public Functions in Smart Accounts Kit Reference

I've completed a comprehensive audit of the Smart Accounts Kit SDK exports versus the current reference documentation. Here are all the missing public functions and exports that need to be documented:

---

## 📋 Missing Utility Functions (from `@metamask/smart-accounts-kit/utils`)

### Delegation Conversion
- **`toDelegationStruct`** - Converts a Delegation to a DelegationStruct (bigint salt for on-chain ops)
- **`toDelegation`** - Converts a DelegationStruct to a Delegation (hex salt for off-chain ops)

### Execution Encoding
- **`encodeExecutionCalldata`** - Encodes execution calldata for single or batch execution
- **`encodeExecutionCalldatas`** - Encodes multiple execution calldatas for redeeming delegations
- **`encodeSingleExecution`** - Encodes a single execution using packed encoding
- **`encodeBatchExecution`** - Encodes a batch of executions using ABI encoding

### Call Encoding
- **`encodeCallsForCaller`** - Encodes calls for a specific caller address

### Account Data
- **`getCounterfactualAccountData`** - Calculates the counterfactual address and factory calldata for deploying a smart account

---

## 📋 Missing Main Export Functions

### Caveat Creation
- **`createCaveat`** - Low-level function for creating custom caveats (enforcer, terms, args)

---

## 📋 Missing Constants

### Main Export Constants
- **`ROOT_AUTHORITY`** - Constant for root delegations (currently mentioned in examples only)
- **`ANY_BENEFICIARY`** - Constant for open delegations  
- **`PREFERRED_VERSION`** - Preferred version of Delegation Framework contracts

### Utils Export Constants (ABI & Type Hash)
- **`DELEGATION_ARRAY_ABI_TYPE`** - ABI type for delegation array
- **`DELEGATION_ABI_TYPE`** - ABI type for single delegation
- **`DELEGATION_ABI_TYPE_COMPONENTS`** - ABI components for delegation type
- **`DELEGATION_TYPEHASH`** - EIP-712 type hash for delegation
- **`CAVEAT_TYPEHASH`** - EIP-712 type hash for caveat
- **`SIGNABLE_DELEGATION_TYPED_DATA`** - Typed data structure for signing delegations
- **`SIGNATURE_ABI_PARAMS`** - ABI parameters for WebAuthn signatures
- **`SIGNABLE_USER_OP_TYPED_DATA`** - Typed data structure for signing user operations

---

## 📋 Missing Action Functions (from `@metamask/smart-accounts-kit/actions`)

### Bundler Client
- **`createInfuraBundlerClient`** - Creates a bundler client with Infura/Pimlico gas price methods
  - Related types: `InfuraBundlerClient`, `GasPriceTier`, `UserOperationGasPriceResponse`

### Validation
- **`isValid7702Implementation`** - Checks if an account is properly delegated to the EIP-7702 implementation

### Action Builders
- **`caveatEnforcerActions`** - Extends clients with caveat enforcer methods
- **`signDelegationActions`** - Extends clients with signDelegation method
- **`signUserOperationActions`** - Extends clients with signUserOperation method
- **`erc7715ProviderActions`** - Provider actions (used in examples but not in reference)
- **`erc7710WalletActions`** - Wallet actions (used in examples but not in reference)
- **`erc7710BundlerActions`** - Bundler actions (used in examples but not in reference)

### ERC-7715 Permission Methods
- **`getSupportedExecutionPermissions`** - Retrieves supported execution permissions from MetaMask
- **`getGrantedExecutionPermissions`** - Retrieves granted execution permissions from MetaMask

---

## 📋 Missing Contract Utilities (from `@metamask/smart-accounts-kit/contracts`)

- **`isContractDeployed`** - Checks if a contract is deployed at an address
- **`isImplementationExpected`** - Verifies if the implementation matches expected bytecode
- **`encodeProxyCreationCode`** - Encodes proxy creation code for CREATE2 deployment

---

## 📋 Missing Enums

- **`BalanceChangeType`** - Enum with values `Increase` (0x0) and `Decrease` (0x1) for balance change validation

---

## 📋 Missing Types

- **`DelegationStruct`** - Type for delegation with bigint salt (for on-chain operations)
- **`AuthenticatorFlags`** - Type for WebAuthn authenticator flags

---

## 📋 Missing Experimental Exports (from `@metamask/smart-accounts-kit/experimental`)

- **`DelegationStorageClient`** - Client for storing/retrieving delegations from IPFS
- **`DelegationStoreFilter`** (type) - Filter parameters for querying stored delegations
- **`Environment`** (type) - Environment configuration for delegation storage
- **`DelegationStorageConfig`** (type) - Configuration for delegation storage client

---

## 📊 Summary

**Total Missing Items: ~50**

**Breakdown**:
- Utility Functions: 8
- Main Functions: 1
- Constants: 11 (main + ABI)
- Action Functions: 11
- Contract Utilities: 3
- Enums: 1
- Types: 2
- Experimental: 4

---

## 🎯 Priority Recommendations

### High Priority
1. Utility encoding functions (encodeExecutionCalldata, encodeSingleExecution, encodeBatchExecution)
2. Constants (ROOT_AUTHORITY, ANY_BENEFICIARY)
3. Action builders currently in examples (erc7715ProviderActions, erc7710WalletActions, erc7710BundlerActions)
4. Permission methods (getSupportedExecutionPermissions, getGrantedExecutionPermissions)

### Medium Priority
1. Account utilities (getCounterfactualAccountData, encodeCallsForCaller)
2. Delegation conversion (toDelegationStruct, toDelegation)
3. Validation (isValid7702Implementation)
4. Bundler (createInfuraBundlerClient)
5. createCaveat function

### Low Priority
1. ABI constants (DELEGATION_ABI_TYPE, DELEGATION_TYPEHASH, etc.)
2. Contract utilities (isContractDeployed, isImplementationExpected, encodeProxyCreationCode)
3. Experimental features (DelegationStorageClient)
4. Additional action builders

**SDK Reference**: https://github.com/MetaMask/smart-accounts-kit/tree/main/packages/smart-accounts-kit
