import { useState } from 'react';
import './Sidebar.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { CgProfile } from 'react-icons/cg';
import {AiOutlineProfile} from 'react-icons/ai';
import { FaRegStickyNote, FaStickyNote } from 'react-icons/fa';
import { Button } from '@mui/material';
import { RiLogoutCircleLine } from 'react-icons/ri';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: 'black'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: 'black'
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar({ children }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(1);
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleChangePage = (index, path) => {
        setSelected(index);
        navigate(path);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} className='drawerStyled'>
                <div style={{ width: '100%', display: 'flex', justifyContent: open ? 'right' : 'center', alignItems: 'center' }}>
                    {
                        open
                            ? <span style={{ color: 'white', fontWeight: 'bold', fontSize: '2rem', marginRight: '12px' }}>NOTES</span>
                            : null
                    }
                    <Tooltip title={open ? 'Close' : 'Open'} placement='right'>
                        <IconButton onClick={handleDrawer} size='large'>
                            {
                                open
                                    ? <FaRegStickyNote style={{ color: 'white' }} />
                                    : <FaStickyNote style={{ color: 'white' }} />
                            }
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider sx={{ backgroundColor: 'white' }} />
                {/* <List>
                    <Tooltip title='My Profile' placement='right'>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                selected={selected === 1}
                                onClick={() => handleChangePage(1, '/Private')}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    <CgProfile size='2rem' style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='My Profile' sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                            </ListItemButton>
                        </ListItem>
                    </Tooltip>
                </List> */}
                <Divider sx={{ backgroundColor: 'white' }} />
                <List>
                    <Tooltip title='Notes' placement='right'>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: 'white'
                                }}
                                selected={selected === 3}
                                onClick={() => handleChangePage(3, '/Private/Notes')}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AiOutlineProfile size='2rem' style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='Notes' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Tooltip>
                </List>
                <Tooltip title='Logout' placement='right'>
                    {
                        open
                            ? <Button
                                variant='contained'
                                color='error'
                                sx={{ position: 'absolute', bottom: '0', marginBottom: '9px', marginLeft: '69px' }}
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                            : <IconButton
                                onClick={() => logout()}
                                sx={{ color: 'white', position: 'absolute', bottom: '0', left: '0', width: '100%', marginBottom: '9px' }}
                            >
                                <RiLogoutCircleLine size='2rem' style={{ color: 'red' }} />
                            </IconButton>
                    }
                </Tooltip>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, padding: '1rem' }}>
                {children}
            </Box>
        </Box>
    );
}