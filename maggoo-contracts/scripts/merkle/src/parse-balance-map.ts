import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
interface MerkleDistributorInfo {
  merkleRoot: string
  tokenTotal: string
  claims: {
    [account: string]: {
      index: number
      amount: string
      proof: string[]
      flags?: {
        [flag: string]: boolean
      }
    }
  }
}

type MaggooFormat = {address:string; nft_id : string; name:string;quantity:string;is_main:boolean};

export function parseBalanceMap(balances: MaggooFormat[]): MerkleDistributorInfo {
  // if balances are in an old format, process them
  const balancesInNewFormat: MaggooFormat[] = Array.isArray(balances)
    ? balances
    : Object.keys(balances).map(
        (account): MaggooFormat => ({
          address: account,
          nft_id:"0",
          name:"",
          quantity:"",
          is_main:false
        })
      )

  const dataByAddress = balancesInNewFormat.reduce<{
    [address: string]: { nft_id : string; name:string; quantity:string; is_main:boolean }

  }>((memo, { address: account, nft_id, name,quantity,is_main }) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`)
    }
    const parsed = getAddress(account)
    //if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)

    memo[parsed] = {nft_id:nft_id,name:name,quantity:quantity,is_main:is_main }
    return memo
  }, {})

  const sortedAddresses = Object.keys(dataByAddress).sort()

  // construct a tree
  const tree = new BalanceTree(
    sortedAddresses.map((address) => ({ account: address, amount: BigNumber.from( dataByAddress[address].nft_id )}))
  )

  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: { amount: string; index: number; name:string; quantity:string;is_main:boolean; proof: string[];}
  }>((memo,address,index) => {
    const { nft_id, name, quantity,is_main } = dataByAddress[address]

    memo[address] = {
      index,
      amount: BigNumber.from(nft_id).toHexString(),
      name:name,
      quantity:quantity,
      is_main:is_main,
      proof: tree.getProof(index, address, BigNumber.from(nft_id)),
    }
    return memo
  }, {})

  const tokenTotal: BigNumber = sortedAddresses.reduce<BigNumber>(
    (memo, key) => memo.add(BigNumber.from(dataByAddress[key].quantity)),
    BigNumber.from(0)
  )

  return {
    merkleRoot: tree.getHexRoot(),
    tokenTotal: tokenTotal.toHexString(),
    claims,
  }
}
