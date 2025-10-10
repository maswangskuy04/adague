export function getInitials(fullname = '') {
    if(!fullname) return 'AG'

    return fullname.trim().split(' ').splice(0, 2).map(item => item[0]).join('')
}

export function getFirstName(fullname = '') {
    if(!fullname) return 'User'

    return fullname.trim().split(' ')[0]
}