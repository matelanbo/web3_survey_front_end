import React, { useState, useEffect } from "react"
import { Card, Box, Divider, CardContent } from "@material-ui/core"
import { Token } from "../Main"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { Button, Tab, CircularProgress } from "@material-ui/core"
import { useStakeTokens, useRewardsCheck, useAnswer, useClaimRewards, useUpdateQuestions, useTotalQuestions, useUpdateMyRewards, useQuestionsList, useMyAnsweredQuestions, useMyCreatedQuestions } from "../../hooks"
import { utils } from "ethers"
import { WalletBalance } from "./WalletBalance"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import UpdateIcon from '@mui/icons-material/Update';
import SavingsIcon from '@mui/icons-material/Savings';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { type } from "os"
import { CardActions, List, Typography } from "@mui/material"


export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0

    const [rewardsToAssign, setRewardsToAssign] = useState('')
    const [maxAnswers, setMaxAnswers] = useState('')
    const [deadline, setDeadline] = useState('')

    const [answerId, setAnswerId] = useState('')

    const [selectedQuestionTypeIndex, setSelectedQuestionTypeIndex] = useState<number>(0)
    const questionsType = [{ "index": 0, "text": "All Questions" }, { "index": 1, "text": "My Answered Questions" }, { "index": 2, "text": "My Posted Questions" }]
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedQuestionTypeIndex(parseInt(newValue))
    }



    //   const handleInputChangeDeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    //       const deadline = event.target.value === "" ? "" : Number(event.target.value)
    //       setDeadline(deadline)
    //       console.log(deadline)
    //   }

    const { approveAndStake, state: approveAndStakeErc20State } = useStakeTokens(tokenAddress)
    //  console.log("here is rewards to assign:", rewardsToAssign)
    const handleQuestionnaireCreation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("here is rewards to assign:")
        const rewardsToAssignAsWei = utils.parseEther(rewardsToAssign.toString())
        console.log("here is rewards to assign:", rewardsToAssignAsWei)
        return approveAndStake(rewardsToAssignAsWei.toString(), maxAnswers, deadline)
    }



    const rewards = useRewardsCheck(tokenAddress)
    const formattedRewards: number = rewards ? parseFloat(formatUnits(rewards, 18)) : 0

    const numberOfQuestions = useTotalQuestions("0")
    // const formattedNumberOfQuestions: number = numberOfQuestions ? parseFloat(formatUnits(numberOfQuestions, 18)) : 0

    const { answerQuestions, state: answerState } = useAnswer("0")
    const handleAnswer = (id: string) => {
        console.log("Answered question ", id)
        answerQuestions(id)
    }



    const { claimRewards, state: claimRewardsState } = useClaimRewards("0")
    const handleClaimRewards = () => {
        console.log("rewards claimed")
        claimRewards()
    }

    const { updateQuestions, state: updateQuestionsState } = useUpdateQuestions("0")
    const handleUpdateQuestions = () => {
        console.log("questions updating...")
        updateQuestions()
    }

    const { updateMyRewards, state: updateMyRewardsState } = useUpdateMyRewards("0")
    const handleUpdateMyRewards = () => {
        console.log("rewards updating...")
        updateMyRewards()
    }
    const isMining = approveAndStakeErc20State.status === "Mining" ||
        answerState.status === "Mining" ||
        claimRewardsState.status === "Mining"
    const temp = useQuestionsList("0")
    console.log(temp)
    //const myAnsweredQuestions = useMyAnsweredQuestions("0")
    const questionsList = temp
    //const questionsList = [{ 'id': 0, 'status': 0, 'answered': 11, 'maxAnswers': 20, "rewards": 1 }, { 'id': 1, 'status': 0, 'answered': 11, 'maxAnswers': 20, "rewards": 1 }, { 'id': 2, 'status': 1, 'answered': 11, 'maxAnswers': 20, "rewards": 1 }]
    console.log("questionsList out", questionsList)
    const activeQuestions = questionsList.map((questions) => {
        if (questions.status === 0) {
            return (
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Question #{questions.id}   {questions.answered}/{questions.maxAnswers} Total Rewards: {questions.rewards}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary">View</Button>
                        <Button
                            variant="contained"
                            onClick={() => handleAnswer(questions.id.toString())}
                            color="primary"
                            disabled={isMining}>
                            {isMining ? <CircularProgress size={26} /> : "Answer Question"}
                        </Button>
                    </CardActions>
                </Card>
            )
        }
    })
    console.log("activeQuestions", activeQuestions)
    const unactiveQuestions = questionsList.map((questions) => {
        if (questions.status !== 0) {
            return (
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Question {questions.id} closed status: {questions.status === 1 ? "Finished" : "Expired"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary">View</Button>
                    </CardActions>
                </Card>
            )
        }
    })

    const temp2 = useMyAnsweredQuestions("0")
    console.log("my answered", temp2)
    const myAnsweredQuestionsList = temp2
    const getMyAnsweredQuestions = myAnsweredQuestionsList.map((questionId: number) => {
        const question = questionsList[questionId]
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                        Question #{question.id}   {question.answered}/{question.maxAnswers} Status: {question.status === 0 ? "open" : "closed"} Total Rewards:{question.rewards}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">View</Button>
                </CardActions>
            </Card>
        )
    }
    )
    const temp3 = useMyCreatedQuestions("0")
    console.log("my created", temp3)
    const myCreatedQuestionsList = temp3
    const getMyCreatedQuestions = myCreatedQuestionsList.map((questionId: number) => {
        const question = questionsList[questionId]
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                        Question #{question.id}   {question.answered} / {question.maxAnswers} Status: {question.status === 0 ? "open" : "closed"}, Rewards: {question.rewards}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">View</Button>
                    <Button variant="contained" color="primary">Download Results</Button>
                </CardActions>
            </Card>
        )
    }
    )

    //   console.log(isMining)

    // console.log(rewardsToAssign, maxAnswers, deadline)
    return (
        <>
            <div>
                <WalletBalance token={token}></WalletBalance>
                <form onSubmit={handleQuestionnaireCreation}>
                    <label>
                        rewards to assign:
                        <input type="text" required value={rewardsToAssign} onChange={(e) => setRewardsToAssign(e.target.value)}>
                        </input>
                    </label>
                    <label>
                        Maximun answers to accept:
                        <input type="number" required value={maxAnswers} onChange={(e) => setMaxAnswers(e.target.value)}>
                        </input>
                    </label>
                    <label>
                        Deadline:
                        <input type="number" required value={deadline} onChange={(e) => setDeadline(e.target.value)}>
                        </input>
                    </label>
                    {isMining ? <CircularProgress size={26} /> :
                        <input type="submit" value="Creat Questionnaire!!!"></input>}
                </form>
            </div>
            <div>
                <Card>
                    <CardContent style={{ backgroundColor: '#d0dcc0' }}>

                        <Typography sx={{ fontSize: 24, fontStyle: 'normal', alignSelf: 'flex-end' }} gutterBottom>
                            Your token rewards:{formattedRewards}
                        </Typography>

                    </CardContent>
                    <CardActions style={{ backgroundColor: '#d0dcc0' }}>
                        {formattedRewards === 0 ?
                            <p>No Rewards to claim!</p> :
                            <div>
                                <Button
                                    startIcon={<SavingsIcon></SavingsIcon>}
                                    variant="contained"
                                    onClick={handleClaimRewards}
                                    color="primary"
                                    size="large"
                                    disabled={isMining}>
                                    {isMining ? <CircularProgress size={26} /> : "Claim Rewards"}
                                </Button>
                            </div>
                        }
                    </CardActions>
                </Card>
                <div>
                    <Button
                        startIcon={<UpdateIcon></UpdateIcon>}
                        variant="contained"
                        onClick={handleUpdateQuestions}
                        color="secondary"
                        size="large"
                        disabled={isMining}>
                        {isMining ? <CircularProgress size={26} /> : "Update questions status"}
                    </Button>
                </div>
                <div>
                    <Button
                        startIcon={<UpdateIcon></UpdateIcon>}
                        variant="outlined"
                        onClick={handleUpdateMyRewards}
                        color="secondary"
                        size="large"
                        disabled={isMining}>
                        {isMining ? <CircularProgress size={26} /> : "Update my rewards"}
                    </Button>
                </div>
            </div>
            <div>
                <Box>
                    <TabContext value={selectedQuestionTypeIndex.toString()}>
                        <TabList onChange={handleChange} aria-label="questions type tabs">
                            {questionsType.map((type) => {
                                return (
                                    <Tab label={type.text}
                                        value={type.index.toString()}
                                        key={type.index}></Tab>
                                )
                            })}
                        </TabList>
                        <TabPanel value="0">
                            <Typography sx={{ textAlign: 'right', fontSize: 22 }}>Total number of questions:{numberOfQuestions}</Typography >
                            {activeQuestions}
                            {unactiveQuestions}
                        </TabPanel>
                        <TabPanel value="1">
                            {getMyAnsweredQuestions}
                        </TabPanel>
                        <TabPanel value="2">
                            {getMyCreatedQuestions}
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    )
}