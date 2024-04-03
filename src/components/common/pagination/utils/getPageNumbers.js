export default ({ total_pages, current_page, page_numbers_to_show = 5 }) => {
    const current_page_number = current_page <= total_pages ? current_page : total_pages
    const max_pages_before_current_page = Math.floor(page_numbers_to_show / 2)
    const max_pages_after_current_page = Math.ceil(page_numbers_to_show / 2) - 1
    let start_page = 1
    let end_page = total_pages

    if (total_pages <= 1) return []

    if (current_page_number <= max_pages_before_current_page) {
        start_page = 1
        end_page = page_numbers_to_show
    } else if (current_page_number + max_pages_after_current_page >= total_pages) {
        start_page = total_pages - page_numbers_to_show + 1
    } else {
        start_page = current_page_number - max_pages_before_current_page
        end_page = current_page_number + max_pages_after_current_page
    }

    let page_numbers = [...Array(end_page + 1 - start_page).keys()].reduce((result, el) => {
        const page_number = start_page + el
        if (page_number <= total_pages && page_number > 0) result.push(page_number)
        return result
    }, [])

    if (page_numbers[0] > 1) {
        if (page_numbers[0] <= 2) {
            page_numbers = [1, ...page_numbers]
        } else {
            const dummy = page_numbers[0] > 3 ? 'dummy' : 2
            page_numbers = [1, dummy, ...page_numbers]
        }
    }

    if (page_numbers[page_numbers.length - 1] !== total_pages) {
        if (page_numbers[page_numbers.length - 1] === total_pages - 1) {
            page_numbers = [...page_numbers, total_pages]
        } else {
            const dummy = page_numbers[page_numbers.length - 1] < total_pages - 2 ? 'dummy' : total_pages - 1
            page_numbers = [...page_numbers, dummy, total_pages]
        }
    }

    return page_numbers
}
