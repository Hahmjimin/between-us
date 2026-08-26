import { Navigate, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import RelationshipPage from './pages/RelationshipPage'
import StoryPage from './pages/StoryPage'
import FollowUpPage from './pages/FollowUpPage'
import LoadingPage from './pages/LoadingPage'
import ResultPage from './pages/ResultPage'
import DeepResultPage from './pages/DeepResultPage'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFail from './pages/PaymentFail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/relationship" element={<RelationshipPage />} />
      <Route path="/story" element={<StoryPage />} />
      <Route path="/follow-up" element={<FollowUpPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/fail" element={<PaymentFail />} />
      <Route path="/deep-result" element={<DeepResultPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App