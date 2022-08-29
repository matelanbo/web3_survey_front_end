import { useEthers, useCall } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useMyAnsweredQuestions = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { account, chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    // Check Rewards
    //console.log("in", tokenAddress, tokenFarmAddress)
    const { value: myAnsweredQuestions } =
        useCall({
            contract: tokenFarmContract,
            method: 'getMyAnsweredQuestions',
            args: [account]
        }) ?? {}
    //console.log("in my answered:", myAnsweredQuestions[0])
    return myAnsweredQuestions === undefined ? [] : myAnsweredQuestions[0]

}