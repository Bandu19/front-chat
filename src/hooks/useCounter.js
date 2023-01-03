import { useState } from "react"

export const useCounter = () => {
    const [counter, setCounter] = useState(0)
    const increase = () => setCounter(counter + 1)

    return {
        increase
    }
}

