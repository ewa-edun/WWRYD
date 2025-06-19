import {Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import SignIn from './components/SignIn'
import Home from './components/Home'
import TonyStark from './components/TonyStark'
import JensenHuang from './components/JensenHuang'
import ManmohanSingh from './components/ManmohanSingh'
import HedyLamarr from './components/HedyLamarr'
import MarieCurie from './components/MarieCurie'
import PrincessDiana from './components/PrincessDiana'
import PastChats from './components/PastChats'
import Footer from './components/Footer'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tony-stark" element={<TonyStark />} />
        <Route path="/jensen-huang" element={<JensenHuang />} />
        <Route path="/manmohan-singh" element={<ManmohanSingh />} />
        <Route path="/hedy-lamarr" element={<HedyLamarr />} />
        <Route path="/marie-curie" element={<MarieCurie />} />
        <Route path="/princess-diana" element={<PrincessDiana />} />
        <Route path="/past-chats" element={<PastChats />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
