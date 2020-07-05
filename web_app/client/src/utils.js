export function range(n) {
    return [...Array(n).keys()]
}
export function isEmpty(obj) {
    if (obj)
        return Object.keys(obj).length === 0
    else
        return false
}

export function getNextEl(array, el) {
    if (array.includes(el))
        return array[(array.indexOf(el) + 1) % array.length]
    else
        throw 'Item not in list'
}
export function getPrevEl(array, el) {
    if (array.includes(el)) {
        const index = (array.indexOf(el) - 1)
        return array[(index >= 0) ? index : (array.length - 1)]
    }
    else {
        throw 'Item not in list'
    }
}
export function dropLast(array) {
    return array.filter((_, i) => i != array.length - 1)
}
export function drop(array, index) {
    return array.filter((_, i) => i != index)
}

export function closest(startElement, finalElementSelector) {
    let currentElement = startElement
    let finalElementCheck = currentElement.matches(finalElementSelector)
    while (!finalElementCheck) {
        currentElement = currentElement.parentNode
        if (currentElement.nodeName === 'BODY') {
            return null
        }
        finalElementCheck = currentElement.matches(finalElementSelector)
    }
    return currentElement
}
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function strip(str) {
    const strippedString = str.replace(/^\s\s*/, '')
    const whitespace = /\s/
    let index = strippedString.length;
    while (whitespace.test(strippedString.charAt(--index)));
    return strippedString.slice(0, index + 1);
}

export function regex(pattern, string) {
    // il pattern deve avere i backslash doppi in casi di modificatori regex es: \d -> \\d
    return string.match(new RegExp(pattern)).filter((_, i) => i != 0)
}

export function post(params) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", params.endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    xhr.send(JSON.stringify(params.data));
}

export function items(obj) {
    return Object.entries(obj)
}