import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import TonyStark from './components/TonyStark'
import JensenHuang from './components/JensenHuang'
import ManmohanSingh from './components/ManmohanSingh'
import HedyLamarr from './components/HedyLamarr'
import MarieCurie from './components/MarieCurie'
import PrincessDiana from './components/PrincessDiana'
import Footer from './components/Footer'

import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/tony-stark" element={<TonyStark />} />
        <Route path="/jensen-huang" element={<JensenHuang />} />
        <Route path="/manmohan-singh" element={<ManmohanSingh />} />
        <Route path="/hedy-lamarr" element={<HedyLamarr />} />
        <Route path="/marie-curie" element={<MarieCurie />} />
        <Route path="/princess-diana" element={<PrincessDiana />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
