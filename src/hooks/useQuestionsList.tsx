import { useEthers, useCall } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"
import { formatUnits } from "@ethersproject/units"

export const useQuestionsList = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { account, chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    // Check Rewards
    //const results = [[0], [1], [2], [3]]
    console.log("questionlist in", account, tokenFarmAddress)
    const { value: results } =
        useCall({
            contract: tokenFarmContract,
            method: 'getQuestionsStatus',
            args: []
        }) ?? {}
    console.log("out", results === undefined)
    if (results === undefined) {
        console.log("is undefined")
        return []
    }
    const questionsList = results[1]
    console.log(questionsList.length)
    console.log(results)
    const toShow = []
    for (var i = 0; i < questionsList.length; i++) {
        const formattedAnswered: number = results[1][i] ? parseFloat(formatUnits(results[1][i], 0)) : 0
        const formattedMaxAnswers: number = results[2][i] ? parseFloat(formatUnits(results[2][i], 0)) : 0
        const formattedRewards: number = results[3][i] ? parseFloat(formatUnits(results[3][i], 18)) : 0
        toShow.push({ "id": i, "status": results[0][i], "answered": formattedAnswered, "maxAnswers": formattedMaxAnswers, "rewards": formattedRewards })
    }
    console.log(toShow)
    return toShow
    //return [{ 'id': 0, 'status': 0, 'answered': 11, 'maxAnswers': 20, "rewards": 10 }, { 'id': 1, 'status': 0, 'spots': 11, 'maxAnswers': 20, "rewards": 10 }, { 'id': 2, 'status': 1, 'spots': 11, 'maxAnswers': 20, "rewards": 10 }]
}