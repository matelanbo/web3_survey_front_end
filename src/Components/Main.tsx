/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import { StakeForm } from "./yourWallet/StakeForm"
import { makeStyles } from "@material-ui/core"
import eth from "../eth.png"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    // Show token values from the wallet
    // Get the address of different tokens
    // Get the balance of the users wallet

    // send the brownie-config to our `src` folder
    // send the build folder
    const classes = useStyles()
    const { chainId, error } = useEthers()
    //   const networkName = chainId ? helperConfig[chainId] : "dev"
    //   let stringChainId = String(chainId)
    //   const dappTokenAddress = chainId ? networkMapping[stringChainId]["DappToken"][0] : constants.AddressZero
    //   const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero // brownie config
    //   const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
    const otTokenAddress = "0x0c62C82b0c554992F9f20EC2d552f7Dd5c5192A2"
    const token: Token = {
        image: eth,
        address: otTokenAddress,
        name: "OT"
    }
    return (<>
        <h2 className={classes.title}>Dapp Token App</h2>
        <StakeForm token={token} />
    </>)
}