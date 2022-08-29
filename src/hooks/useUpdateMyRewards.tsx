import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useUpdateMyRewards = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { account, chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const updateMyRewards = () => {
        return updateRewards(account)
    }

    // stake
    const { send: updateRewards, state: updateRewardsState } =
        useContractFunction(tokenFarmContract, "updateMyRewards", {
            transactionName: "Update my rewards",
        })

    //useEffect
    const [state, setState] = useState(updateRewardsState)

    useEffect(() => {
        setState(updateRewardsState)
    }, [updateRewardsState])


    return { updateMyRewards, state }
}