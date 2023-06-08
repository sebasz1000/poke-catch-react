class FetchError extends Error{
  constructor(message){
    super(message)
    this.name = "Fetch data error"
  }
}

class ContextError extends Error{
  constructor(message){
    super(message)
    this.name = "Outside context error"
  }
}

export {
  FetchError,
  ContextError
}