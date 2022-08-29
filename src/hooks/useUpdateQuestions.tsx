import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useUpdateQuestions = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const updateQuestions = () => {
        return updateQ()
    }

    // stake
    const { send: updateQ, state: updateQState } =
        useContractFunction(tokenFarmContract, "updateQuestionStatus", {
            transactionName: "Update questions status",
        })

    //useEffect
    const [state, setState] = useState(updateQState)

    useEffect(() => {
        setState(updateQState)
    }, [updateQState])


    return { updateQuestions, state }
}