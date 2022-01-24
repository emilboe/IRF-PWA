export const setUserState = (payload: any) => {
    console.log('setting user state', payload)
    return { type: 'SET_USER_STATE', payload }
}
export const setDarkMode = (payload: any) => {
    console.log('setting dark mode state', payload)
    return { type: 'SET_DARK_MODE', payload }
}
