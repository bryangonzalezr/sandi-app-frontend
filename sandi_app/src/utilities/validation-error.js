export const getValidationError = errorCode => {
    const codeMatcher = {
        500 : "Error de conexión interna"
    }
    return codeMatcher[errorCode]
}