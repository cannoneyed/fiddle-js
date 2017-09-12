let nextId = 1

export function generateId() {
  const id = nextId++
  return id.toString()
}
