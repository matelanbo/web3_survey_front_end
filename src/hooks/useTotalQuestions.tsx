import { useEthers, useCall } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useTotalQuestions = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { account, chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    // Check Rewards
    //    console.log("in", tokenAddress, tokenFarmAddress)
    const { value: totalQuestions } =
        useCall({
            contract: tokenFarmContract,
            method: ' getNumberOfQuestions',
            args: []
        }) ?? {}
    //   console.log(rewards)
    return totalQuestions?.[0]

}