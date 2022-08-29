import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import MainRouter from "../chain-info/contracts/MainRouter.json"
import { Contract } from "@ethersproject/contracts"

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { abi } = MainRouter
    const { chainId } = useEthers()
    const tokenFarmAddress = chainId ? networkMapping["4"]["MainRouter"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    const { send: approveErc20Send, state: approveAndStakeErc20State } =
        useContractFunction(erc20Contract, "approve", {
            transactionName: "Approve ERC20 transfer",
        })

    const [maxAnswers, setMaxAnswers] = useState("0")
    const [deadline, setDeadline] = useState("0")

    const approveAndStake = (totalRewards: string, maxAnswers: string, deadline: string) => {
        console.log("amout to stake")
        console.log(totalRewards)
        setAmountToStake(totalRewards)
        setMaxAnswers(maxAnswers)
        setDeadline(deadline)
        console.log(amountToStake, maxAnswers, deadline)
        return approveErc20Send(tokenFarmAddress, totalRewards)
    }

    // stake
    const { send: stakeSend, state: stakeState } =
        useContractFunction(tokenFarmContract, "stake", {
            transactionName: "Stake Tokens",
        })

    const [amountToStake, setAmountToStake] = useState("0")

    //useEffect
    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            stakeSend(amountToStake, maxAnswers, deadline)
        }
    }, [approveAndStakeErc20State, amountToStake])

    const [state, setState] = useState(approveAndStakeErc20State)

    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            setState(stakeState)
        } else {
            setState(approveAndStakeErc20State)
        }
    }, [approveAndStakeErc20State, stakeState])


    return { approveAndStake, state }
}