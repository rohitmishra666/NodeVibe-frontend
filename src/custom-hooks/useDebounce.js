const useDebounce = (func, delay) => {
    let timeout=null

    return (...args) => {
        if(timeout) clearTimeout(timeout)

        timeout=setTimeout(() => {
            func(...args)
        }, delay)
    }
}

export default useDebounce