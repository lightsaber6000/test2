import { required, email } from './validators'

const rules = {
    required,
    email,
}

export default (validation_object, value) => {
    return Object.keys(validation_object).reduce((result, id) => {
        const is_valid = rules[id](value)
        if (!is_valid) result.push(validation_object[id].message)
        return result
    }, [])
}
