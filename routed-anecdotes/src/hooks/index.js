import { useEffect, useState } from "react"
import anecdoteService from "../services/anecdotes"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { 
    inputProps: {
      type, 
      value, 
      onChange, 
    },
    value,
    reset 
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then((data) => {
      setAnecdotes(data)
    })
  }, [])

  const addAnecdote = async (newAnecdote) => {
    const savedAnecdote = await anecdoteService.createNew(newAnecdote)
    setAnecdotes(anecdotes.concat(savedAnecdote))
  } 

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id)
    setAnecdotes(anecdotes.filter(a => a.id !== id))
  }

  return { 
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}