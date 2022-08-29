import { Button, makeStyles } from "@material-ui/core"
import { useEthers } from "@usedapp/core"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ButtonGroup } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1),
        marginLeft: "auto"
    },
}))


export const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goDashboard = () => { };

    const goCreateSurvey = () => { };

    const goTutorial = () => { };

    const goDocuments = () => { };

    const classes = useStyles()

    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography fontSize={34}>OpenQuest</Typography>
                    <ButtonGroup sx={{ m: 2 }} variant="text" aria-label="navbar primary button group">
                        <Button onClick={goDashboard}>
                            <Typography sx={{ fontSize: 20 }}> Dashboard </Typography>
                        </Button>
                        <Button onClick={goCreateSurvey}>
                            <Typography sx={{ fontSize: 20 }}> Create Survey </Typography>
                        </Button>
                        <Button onClick={goTutorial}>
                            <Typography sx={{ fontSize: 20 }}>  Tutorial </Typography>
                        </Button>
                        <Button onClick={goDocuments}>
                            <Typography sx={{ fontSize: 20 }}> Documents </Typography>
                        </Button>

                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ m: 2 }}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Typography sx={{ fontSize: 20 }}>More</Typography>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>coming soon</MenuItem>
                        </Menu>
                    </ButtonGroup>
                    <div className={classes.container}>
                        {isConnected ? (
                            <Button variant="contained" onClick={deactivate}>
                                <Typography sx={{ textAlign: 'right', fontSize: 16 }} noWrap={true}>{account}</Typography>
                            </Button>
                        ) : (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => activateBrowserWallet()}
                            >
                                Connect
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </Box >

    )
}
