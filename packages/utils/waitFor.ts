export const waitFor = async (
  fn: () => unknown,
  { count = 10, delay = 10 } = {}
) => {
  const result = await fn()
  if (result) {
    return result
  }
  if (count - 1) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await waitFor(fn, { count: count - 1 })
        resolve(result)
      }, delay)
    })
  } else {
    return null
  }
}
