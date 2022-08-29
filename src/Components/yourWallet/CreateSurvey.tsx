import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function CreateSurvey(prop: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <Button startIcon={<AddIcon></AddIcon>} onClick={handleOpen} variant="contained" color="secondary" style={{ marginRight: "auto" }}>Creat Survey</Button>
                <Typography sx={{ textAlign: 'right', fontSize: 24 }}>Total number of answered:{prop.numberOfMyCreated}</Typography >
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Survey Description
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Survey Content
                    </Typography>
                    {prop.content}
                </Box>
            </Modal>
        </div>
    );
}
