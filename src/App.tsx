import { RemedyList, RemedyForm } from './components/Remedies'
import { SymptomList, SymptomForm } from './components/Symptoms'

function App() {
  return (
    <>
      <RemedyList />
      <RemedyForm />

      <hr />

      <SymptomList />
      <SymptomForm />
    </>
  )
}

export default App
