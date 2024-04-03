export default (value) => {
    let separate_value = ''
    if (value || value === 0) {
        let string_number = value
        if (typeof value === 'number') string_number = value.toString()
        separate_value = string_number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
    return separate_value
}
