export function ErrorMessage({ error }) {
  return (
    <>
      <h3>{error.name}</h3>
      <span>error</span>
    </>
  )
}