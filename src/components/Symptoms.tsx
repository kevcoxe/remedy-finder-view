import { useEffect, useState } from 'react'

type Symptom = {
  Id: number
  Name: string
  Description: string
}

export const SymptomList = () => {
  const [ loadingState, setLoadingState ] = useState({
    symptoms: false
  })
  const [ symptoms, setSymptoms ] = useState<Symptom[]>([])

  useEffect(() => {
    const getSymptoms = async () => {
      setLoadingState((prevState) => ({
        ...prevState,
        symptoms: true
      }));

      const response = await fetch('/api/v1/symptoms')
      const data = await response.json()
      setSymptoms(data)

      setLoadingState((prevState) => ({
        ...prevState,
        symptoms: false
      }));
    }

    getSymptoms()
  
  }, [])

  return (
    <>
      { loadingState.symptoms ? <>loading</> : <>
        { symptoms.map((symptom, idx) => (
          <div key={`${idx}-${symptom.Id}`}>
            <h5>{ symptom.Name }</h5>
            <p>{ symptom.Description }</p>
          </div>
        ))}
      </>}
    </>
  )
}



export const SymptomForm = () => {
  const [ symptom, setSymptom ] = useState({
    Name: '',
    Description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSymptom((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/v1/symptoms', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(symptom)
    })

    if (response.ok) {
      window.location.reload()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          value={symptom.Name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="Description"
          value={symptom.Description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
