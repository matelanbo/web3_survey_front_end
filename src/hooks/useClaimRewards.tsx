import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import networkMapping from "../chain-info/deployments/map.json"
import { Contract } from "@ethersproject/contracts"

export const useClaimRewards = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const claimRewards = () => {
        return claim()
    }

    // stake
    const { send: claim, state: claimState } =
        useContractFunction(tokenFarmContract, "claimRewards", {
            transactionName: "Claim Rewards",
        })

    //useEffect
    const [state, setState] = useState(claimState)
    useEffect(() => {
        setState(claimState)
    }, [claimState])


    return { claimRewards, state }
}