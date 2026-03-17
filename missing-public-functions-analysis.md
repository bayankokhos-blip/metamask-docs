# Analysis of Missing Public Functions in Smart Accounts Kit Reference

**Issue**: [#2764](https://github.com/MetaMask/metamask-docs/issues/2764)  
**Date**: March 17, 2026  
**SDK Version**: 0.4.0-beta.1

This document provides a comprehensive audit of the Smart Accounts Kit SDK exports versus the current reference documentation at https://docs.metamask.io/smart-accounts-kit/development/.

---

## 📋 Missing Utility Functions (from `@metamask/smart-accounts-kit/utils`)

### Delegation Conversion

#### `toDelegationStruct`
**Purpose**: Converts a Delegation to a DelegationStruct  
**Source**: `src/delegation.ts`  
**Description**: Converts the Delegation type (with hex string salt) to DelegationStruct (with bigint salt) for on-chain operations and EIP-712 signing.

**Function Signature**:
```typescript
function toDelegationStruct(delegation: Delegation): DelegationStruct
```

#### `toDelegation`
**Purpose**: Converts a DelegationStruct to a Delegation  
**Source**: `src/delegation.ts`  
**Description**: Converts DelegationStruct (with bigint salt) to Delegation type (with hex string salt) for off-chain operations.

**Function Signature**:
```typescript
function toDelegation(delegationStruct: DelegationStruct): Delegation
```

---

### Execution Encoding

#### `encodeExecutionCalldata`
**Purpose**: Encodes execution calldata for single or batch execution  
**Source**: `src/executions.ts`  
**Description**: Encodes one or more executions into calldata format for the DeleGator's execute method. Automatically chooses between single or batch encoding.

**Function Signature**:
```typescript
function encodeExecutionCalldata(executions: ExecutionStruct[]): Hex
```

#### `encodeExecutionCalldatas`
**Purpose**: Encodes multiple execution calldatas for redeeming delegations  
**Source**: `src/executions.ts`  
**Description**: Maps over a batch of execution arrays and encodes each one, used for `redeemDelegations`.

**Function Signature**:
```typescript
function encodeExecutionCalldatas(executionsBatch: ExecutionStruct[][]): Hex[]
```

#### `encodeSingleExecution`
**Purpose**: Encodes a single execution using packed encoding  
**Source**: `src/executions.ts`  
**Description**: Uses `encodePacked` to efficiently encode a single execution.

**Function Signature**:
```typescript
function encodeSingleExecution(execution: ExecutionStruct): Hex
```

#### `encodeBatchExecution`
**Purpose**: Encodes a batch of executions using ABI encoding  
**Source**: `src/executions.ts`  
**Description**: Uses `encodeAbiParameters` to encode multiple executions as a tuple array.

**Function Signature**:
```typescript
function encodeBatchExecution(executions: ExecutionStruct[]): Hex
```

---

### Call Encoding

#### `encodeCallsForCaller`
**Purpose**: Encodes calls for a specific caller  
**Source**: `src/encodeCalls.ts`  
**Description**: Encodes calls with a specific caller address, useful for delegation scenarios.

**Function Signature**:
```typescript
function encodeCallsForCaller(calls: readonly Call[], caller: Address): Hex
```

**Note**: The `encodeCalls` function is documented as a smart account method but should also be documented as a standalone utility function.

---

### Account Data

#### `getCounterfactualAccountData`
**Purpose**: Calculates counterfactual address and factory calldata  
**Source**: `src/counterfactualAccountData.ts`  
**Description**: Calculates the address a DeleGator contract would have if deployed using CREATE2, and provides the calldata needed to deploy it.

**Function Signature**:
```typescript
async function getCounterfactualAccountData<TImplementation extends Implementation>({
  factory: Address,
  implementations: SmartAccountsEnvironment['implementations'],
  implementation: TImplementation,
  deployParams: DeployParams<TImplementation>,
  deploySalt: Hex,
}): Promise<{ factoryData: Hex; address: Address }>
```

---

## 📋 Missing Main Export Functions

### Caveat Creation

#### `createCaveat`
**Purpose**: Creates a caveat with enforcer, terms, and optional args  
**Source**: `src/caveats.ts`  
**Exported from**: Main package index

**Function Signature**:
```typescript
function createCaveat(enforcer: Hex, terms: Hex, args?: Hex): Caveat
```

**Description**: Low-level function for creating custom caveats. Most users should use `createCaveatBuilder` instead, but this is useful for advanced use cases.

---

## 📋 Missing Constants

### Main Export Constants

#### `ROOT_AUTHORITY`
**Current Status**: Mentioned in examples but not documented as a constant  
**Source**: `@metamask/delegation-core`  
**Value**: `"0x0000000000000000000000000000000000000000000000000000000000000000"`  
**Description**: Used as the `authority` field when creating root delegations (delegations without a parent).

#### `ANY_BENEFICIARY`
**Status**: Not documented  
**Source**: `@metamask/delegation-core`  
**Description**: Constant used for creating open delegations that can be redeemed by any address.

#### `PREFERRED_VERSION`
**Status**: Not documented  
**Source**: `src/smartAccountsEnvironment.ts`  
**Description**: The preferred/default version of Delegation Framework contracts to use.

---

### Utils Export Constants (ABI & Type Hash Constants)

These constants are useful for advanced users who need to work with raw ABI encoding or EIP-712 signing:

#### `DELEGATION_ARRAY_ABI_TYPE`
**Description**: ABI type definition for encoding/decoding delegation arrays

#### `DELEGATION_ABI_TYPE`
**Description**: ABI type definition for encoding/decoding a single delegation

#### `DELEGATION_ABI_TYPE_COMPONENTS`
**Description**: ABI components array for the Delegation type structure

#### `DELEGATION_TYPEHASH`
**Description**: EIP-712 type hash for delegation signing

#### `SIGNABLE_DELEGATION_TYPED_DATA`
**Description**: Complete EIP-712 typed data structure for signing delegations

#### `SIGNATURE_ABI_PARAMS`
**Description**: ABI parameters for WebAuthn signature encoding

#### `SIGNABLE_USER_OP_TYPED_DATA`
**Description**: EIP-712 typed data structure for signing user operations

#### `CAVEAT_TYPEHASH`
**Description**: EIP-712 type hash for caveat hashing

---

## 📋 Missing Action Functions (from `@metamask/smart-accounts-kit/actions`)

### Bundler Client

#### `createInfuraBundlerClient`
**Purpose**: Creates a bundler client extended with Infura/Pimlico actions  
**Source**: `src/actions/infuraBundlerClient.ts`

**Function Signature**:
```typescript
function createInfuraBundlerClient<TTransport, TChain, TAccount>(
  config: BundlerClientConfig<TTransport, TChain, TAccount>
): InfuraBundlerClient<TTransport, TChain, TAccount>
```

**Description**: Wrapper around Viem's `createBundlerClient` that adds the `getUserOperationGasPrice` method for retrieving gas prices from Pimlico's bundler via Infura.

**Associated Types**:
- `InfuraBundlerClient` - Type for the extended bundler client
- `GasPriceTier` - Gas price tier structure (slow/standard/fast)
- `UserOperationGasPriceResponse` - Response from gas price RPC method

---

### Validation

#### `isValid7702Implementation`
**Purpose**: Checks if an account is properly delegated to the EIP-7702 implementation  
**Source**: `src/actions/isValid7702Implementation.ts`

**Function Signature**:
```typescript
async function isValid7702Implementation({
  client: Client,
  accountAddress: Address,
  environment: SmartAccountsEnvironment,
}): Promise<boolean>
```

**Description**: Validates EIP-7702 delegations by checking if the EOA has the correct 7702 contract assigned to it.

---

### Action Builders

These functions extend Viem clients with custom methods:

#### `caveatEnforcerActions`
**Description**: Action builder that extends clients with caveat enforcer methods (getErc20PeriodTransferEnforcerAvailableAmount, etc.)

#### `signDelegationActions`
**Description**: Action builder for extending clients with signDelegation method

#### `signUserOperationActions`
**Description**: Action builder for extending clients with signUserOperation method

#### `erc7715ProviderActions`
**Current Status**: Used in examples but not documented in reference  
**Description**: Provider action builder that adds `requestExecutionPermissions`, `getSupportedExecutionPermissions`, and `getGrantedExecutionPermissions` methods

#### `erc7710WalletActions`
**Current Status**: Used in examples but not documented in reference  
**Description**: Wallet action builder that adds `sendTransactionWithDelegation` method

#### `erc7710BundlerActions`
**Current Status**: Used in examples but not documented in reference  
**Description**: Bundler action builder that adds `sendUserOperationWithDelegation` method

---

### ERC-7715 Permission Methods

#### `getSupportedExecutionPermissions`
**Purpose**: Retrieves supported execution permissions from MetaMask  
**Description**: Queries MetaMask to get the list of permission types it supports (ERC-7715).

**Function Signature**:
```typescript
async function getSupportedExecutionPermissions(): Promise<GetSupportedExecutionPermissionsResult>
```

#### `getGrantedExecutionPermissions`
**Purpose**: Retrieves granted execution permissions from MetaMask  
**Description**: Queries MetaMask to get the permissions that have been granted to the current session.

**Function Signature**:
```typescript
async function getGrantedExecutionPermissions(): Promise<GetGrantedExecutionPermissionsResult>
```

---

## 📋 Missing Contract Utilities (from `@metamask/smart-accounts-kit/contracts`)

#### `isContractDeployed`
**Purpose**: Checks if a contract is deployed at an address  
**Description**: Verifies that code exists at the given address on-chain.

**Function Signature**:
```typescript
async function isContractDeployed(client: Client, address: Address): Promise<boolean>
```

#### `isImplementationExpected`
**Purpose**: Verifies if the implementation matches expected bytecode  
**Description**: Compares the deployed bytecode at an address with expected implementation bytecode.

**Function Signature**:
```typescript
async function isImplementationExpected(
  client: Client,
  address: Address,
  expectedBytecode: Hex
): Promise<boolean>
```

#### `encodeProxyCreationCode`
**Purpose**: Encodes the proxy creation code for CREATE2 deployment  
**Description**: Generates the creation code for deploying a proxy contract using CREATE2.

**Function Signature**:
```typescript
function encodeProxyCreationCode(implementation: Address, initData: Hex): Hex
```

---

## 📋 Missing Enums

### `BalanceChangeType`

**Source**: `src/caveatBuilder/types.ts`  
**Values**:
- `BalanceChangeType.Increase` = `0x0`
- `BalanceChangeType.Decrease` = `0x1`

**Description**: Enum for specifying whether a balance change validation should check for increases or decreases.

---

## 📋 Missing Types

### `DelegationStruct`
**Source**: `src/delegation.ts` (exported from utils)  
**Description**: Type for delegation with bigint salt instead of hex string, used for on-chain operations and EIP-712 signing.

**Type Definition**:
```typescript
type DelegationStruct = Omit<Delegation, 'salt'> & {
  salt: bigint;
}
```

### `AuthenticatorFlags`
**Source**: `src/webAuthn.ts` (exported from utils)  
**Description**: Type for WebAuthn authenticator flags used in passkey signatures.

---

## 📋 Missing Experimental Exports (from `@metamask/smart-accounts-kit/experimental`)

### `DelegationStorageClient`
**Purpose**: Client for storing and retrieving delegations from IPFS  
**Source**: `src/experimental/delegationStorage.ts`

**Description**: Provides methods to store delegations on IPFS and retrieve them later, useful for sharing delegations across applications.

**Associated Types**:
- `DelegationStoreFilter` - Filter parameters for querying stored delegations
- `Environment` - Environment configuration (e.g., 'production', 'development')
- `DelegationStorageConfig` - Configuration for the delegation storage client

---

## 📊 Summary Statistics

**Total Missing Items: ~50**

**Breakdown by Category**:
- Utility Functions: 8
- Main Functions: 1  
- Constants: 11 (main) + ABI constants
- Action Functions: 11
- Contract Utilities: 3
- Enums: 1
- Types: 2
- Experimental: 4

---

## 🎯 Priority Recommendations

### High Priority (Essential for Advanced Use Cases)
1. **Utility encoding/decoding functions**: `encodeExecutionCalldata`, `encodeExecutionCalldatas`, `encodeSingleExecution`, `encodeBatchExecution`
2. **Delegation conversion**: `toDelegationStruct`, `toDelegation`
3. **Constants**: `ROOT_AUTHORITY`, `ANY_BENEFICIARY`, `PREFERRED_VERSION`
4. **Action builders**: `erc7715ProviderActions`, `erc7710WalletActions`, `erc7710BundlerActions` (currently only in examples)
5. **Permission methods**: `getSupportedExecutionPermissions`, `getGrantedExecutionPermissions`

### Medium Priority (Useful for Specific Scenarios)
1. **Account utilities**: `getCounterfactualAccountData`, `encodeCallsForCaller`
2. **Caveat creation**: `createCaveat`
3. **Validation**: `isValid7702Implementation`
4. **Bundler**: `createInfuraBundlerClient` and related types
5. **Enum**: `BalanceChangeType`

### Low Priority (Advanced/Optional)
1. **ABI constants**: `DELEGATION_ABI_TYPE`, `DELEGATION_TYPEHASH`, `SIGNABLE_DELEGATION_TYPED_DATA`, etc.
2. **Contract utilities**: `isContractDeployed`, `isImplementationExpected`, `encodeProxyCreationCode`
3. **Action builders**: `caveatEnforcerActions`, `signDelegationActions`, `signUserOperationActions`
4. **Experimental**: `DelegationStorageClient` and related types
5. **Types**: `DelegationStruct`, `AuthenticatorFlags`

---

## 📦 SDK Package Exports Structure

The SDK exports from multiple entry points:

1. **Main export** (`@metamask/smart-accounts-kit`): Core functions, types, enums
2. **Utils export** (`@metamask/smart-accounts-kit/utils`): Utility functions and constants
3. **Actions export** (`@metamask/smart-accounts-kit/actions`): Viem client actions and builders
4. **Contracts export** (`@metamask/smart-accounts-kit/contracts`): Contract ABIs and utilities
5. **Experimental export** (`@metamask/smart-accounts-kit/experimental`): Experimental features

---

## 📚 Documentation Gaps

1. **Action builders are used in examples but not documented in reference**: The `erc7715ProviderActions`, `erc7710WalletActions`, and `erc7710BundlerActions` functions appear in code examples throughout the guides but don't have dedicated reference pages explaining their purpose and usage.

2. **Constants are referenced but not documented**: `ROOT_AUTHORITY` and `ANY_BENEFICIARY` are used in code examples but aren't documented as exported constants.

3. **Low-level utilities are missing**: Encoding utilities like `encodeExecutionCalldata`, `encodeSingleExecution`, and `encodeBatchExecution` are essential for advanced use cases but aren't documented.

4. **Contract namespace exports**: The `contracts` namespace exports many contract-related utilities and ABIs that aren't documented in the reference section.

---

## 🔗 References

- **SDK Package**: https://github.com/MetaMask/smart-accounts-kit/tree/main/packages/smart-accounts-kit
- **Current Documentation**: https://docs.metamask.io/smart-accounts-kit/development/
- **Package Version**: 0.4.0-beta.1
