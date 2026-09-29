import { Suspense, useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import AboutUs from './Components/AboutUs'
import Gallery from './Components/Gallery'
import ClientReviews from './Components/ClientReviews'
import FAQs from './Components/FAQs'
import ContactUs from './Components/ContactUs'
import CameraPath from './Components/CameraPath'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import Camera from './Components/Camera'

const MIN_LOADER_MS = 2500

function Loader({ onDone }) {
  const { progress, active } = useProgress()
  const startRef = useRef(performance.now())

  useEffect(() => {
    if (!active && progress === 100) {
      const elapsed = performance.now() - startRef.current
      const wait = Math.max(MIN_LOADER_MS - elapsed, 0)
      const id = setTimeout(onDone, wait)
      return () => clearTimeout(id)
    }
  }, [active, progress, onDone])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-brand-black">
      <span className="font-arizonia text-4xl text-brand-offwhite">Loading</span>
      <div className="h-px w-48 overflow-hidden bg-brand-offwhite/15">
        <div
          className="h-full bg-brand-crimson transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-audiowide text-[10px] uppercase tracking-[0.3em] text-brand-offwhite/50">
        {Math.floor(progress)}%
      </span>
    </div>
  )
}

function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Navbar />
      <Canvas style={{ height: '100vh',width: '100vw',position: 'fixed',top: 0,left: 0, zIndex: 1 }}>
        <Suspense fallback={null}>
          <Camera />
        </Suspense>
      </Canvas>
      <Hero ready={ready} />
      <AboutUs />
      <Gallery />
      <CameraPath>
        <ClientReviews />
        <FAQs />
        <ContactUs />
      </CameraPath>
    </>
  )
}

export default App
