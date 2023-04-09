import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const userName = sessionStorage.getItem('name')
  const navigate = useNavigate()
  const cerrarSesión = () => {
    sessionStorage.setItem('name' ,"");
    sessionStorage.setItem('token',"");
    sessionStorage.setItem('rol'  ,"");
    navigate('/');
  }
  return (
    <Box sx={{ display:'flex', backgroundColor: 'primary.main', justifyContent:'center', alignItems:'center', p: 2}}>
      <Button onClick={() => navigate('/')} sx={{ textTransform: 'none', color:'primary.contrastText' }}>Home</Button>
      {
        userName 
        &&
        <Button onClick={() => cerrarSesión()} sx={{ textTransform: 'none', color: 'primary.contrastText' }}>{userName}(Cerrar Sesión)</Button>
      }
    </Box>
  )
}

export default Header