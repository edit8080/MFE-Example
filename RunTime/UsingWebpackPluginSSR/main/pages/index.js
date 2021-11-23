import React from 'react'
const Button = (await import('components/Button')).default

export default function Home() {
  return (
    <div>
      <Button>Remote Button</Button>
    </div>
  )
}
