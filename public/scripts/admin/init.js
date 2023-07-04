
const init = () => {
    
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/admin/get_current')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
        if(xhr.status === 200){
            document.getElementById('current').textContent = xhr.responseText
        }
    }

    xhr.send()
}