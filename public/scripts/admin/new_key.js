

const new_key = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/admin/new_key')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onload = () => {
        if(xhr.status === 200){
            document.getElementById('new_key').textContent = xhr.responseText
        }
    }

    xhr.send()
}