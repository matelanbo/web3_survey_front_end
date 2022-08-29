import { useEthers, useCall, useEtherBalance } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useMyCreatedQuestions = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { account, chainId } = useEthers()
    const balance = useEtherBalance(account)
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    // Check Rewards
    //console.log("my account", account, chainId)
    //console.log("in", tokenFarmAddress)
    const { value: myCreatedQuestions } =
        useCall({
            contract: tokenFarmContract,
            method: 'getMyCreatedQuestions',
            args: [account]
        }) ?? {}
    // console.log(myCreatedQuestions[0])
    //console.log("out", myCreatedQuestions[2])
    return myCreatedQuestions === undefined ? [] : myCreatedQuestions[0]

}