import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useAnswer = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const answerQuestions = (questionId: string) => {
        return answer(questionId)
    }

    // stake
    const { send: answer, state: answerState } =
        useContractFunction(tokenFarmContract, "answer", {
            transactionName: "Answer Questions",
        })

    //useEffect
    const [state, setState] = useState(answerState)

    useEffect(() => {
        setState(answerState)
    }, [answerState])


    return { answerQuestions, state }
}