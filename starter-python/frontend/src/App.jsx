import { useState } from 'react'

// Intentionally ugly and minimal — the exercise is in the backend.
export default function App() {
  const [need, setNeed] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ need }),
      })
      setResult(await res.json())
    } catch (err) {
      setError(String(err))
    }
  }

  return (
    <div>
      <h1>Bar recommendations</h1>
      <form onSubmit={submit}>
        <input
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          placeholder="What are you in the mood for?"
          size={50}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <pre>{error}</pre>}
      {result !== null && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
