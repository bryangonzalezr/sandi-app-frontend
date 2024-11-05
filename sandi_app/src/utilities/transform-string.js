export const transformString = (string) => {
    return string.includes('_') ? string.split('_').join(' ') : string
}