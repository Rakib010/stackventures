
const logger = (state) => (next) => (acton) => {
    console.group(acton.type)
    console.info("prv state", state.getState())
    const result = next(acton)
    console.log("next state", state.getState())
    console.groupEnd()
    return result
}

export default logger