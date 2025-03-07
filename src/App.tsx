import DashboardPage from "./pages/DashboardPage"
import { DashboardContexProvider } from "./context/DashboardContex";

function App() {

  return (
    <DashboardContexProvider>
      <DashboardPage></DashboardPage>
    </DashboardContexProvider>
  )
}

export default App
