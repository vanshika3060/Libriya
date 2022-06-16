import { Box, Container, createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBook from './pages/admin/AddBook'
import Navbar from './components/Navbar'
import { ToastContainer } from 'material-react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import './App.css'
import 'material-react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Dashboard from './pages/dashboard/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreatePrintRequest from './pages/printrequest/CreatePrintRequest'
import DisplayPosterRequests from './pages/printrequest/DisplayPosterRequests'
import AdminPrintApproval from './pages/admin/AdminPrintApproval'


import LatePayment from './components/latePayment'
import BookingDetails from './components/BookingDetails';
import DataTable from './components/DataTable';
import Registration from './pages/auth/registration'
import Login from './pages/auth/login'
import ForgotPassowrd from './pages/auth/forgot-password'

import Profile from './pages/user/profile'	
import Cart from './pages/Cart';														 


function App() {
  const theme = createTheme({
    typography: {
      h4: {
        '@media (max-width: 600px)': {
          fontSize: '1.8rem',
        },
      },
    },
    palette: {
      secondary: {
        main: '#2e9c9c',
      },
      primary: {
        main: '#363946',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <Box my={2}>
            <Container maxWidth={false}>
              <Routes>
              <Route path='/Cart' element={<Cart />} />
                <Route path='/admin/add' element={<AddBook />} />
                <Route path='/fines' element={<LatePayment />} />
                <Route path = "/bookingdetails" element={<BookingDetails/>}/>
                <Route path = "/studyroombookings" element={<DataTable/>}/>
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
			        	<Route path='/registration' element={<Registration />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassowrd />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/admin/printRequest' element={<AdminPrintApproval />} />
                <Route path='/printrequest/create' element={<CreatePrintRequest />} />
                <Route path='/printrequest/view' element={<DisplayPosterRequests />} />

                <Route path='/' element={<Dashboard />} />
				<Route path='*' element={<Dashboard />} />
              </Routes>
            </Container>
          </Box>
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
