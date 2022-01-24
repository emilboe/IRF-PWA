export const setUserState = (payload: any) => {
    console.log('setting state', payload)
    return { type: 'SET_USER_STATE', payload }
}
