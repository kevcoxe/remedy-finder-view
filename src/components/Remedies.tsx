import { useEffect, useState } from 'react'

type Remedy = {
  Id: number
  Name: string
  Description: string
}

export const RemedyList = () => {
  const [ loadingState, setLoadingState ] = useState({
    remedies: false,
  })
  const [ remedies, setRemedies ] = useState<Remedy[]>([])

  useEffect(() => {

    const getRemedies = async () => {
      setLoadingState((prevState) => ({
        ...prevState,
        remedies: true
      }));

      const response = await fetch('/api/v1/remedies')
      const data = await response.json()
      setRemedies(data)

      setLoadingState((prevState) => ({
        ...prevState,
        remedies: false
      }));
    }

    getRemedies()
  
  }, [])

  return (
    <>
      { loadingState.remedies ? <>loading</> : <>
        { remedies.map((remedy, idx) => (
          <div key={`${idx}-${remedy.Id}`}>
            <h5>{ remedy.Name }</h5>
            <p>{ remedy.Description }</p>
          </div>
        ))}
      </>}
    </>
  )
}



export const RemedyForm = () => {
  const [ remedy, setRemedy ] = useState({
    Name: '',
    Description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRemedy((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/v1/remedies', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(remedy)
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
          value={remedy.Name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="Description"
          value={remedy.Description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
