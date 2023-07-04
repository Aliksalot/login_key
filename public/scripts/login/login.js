
const send_key = () => {

    const keyInput = document.getElementById('keyInput')

    const keyAttempt = keyInput.value

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/login/try_key')
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        if(xhr.status === 200){
            console.log(xhr.responseText)
            const response = JSON.parse(xhr.responseText)
            if(response.result){
                window.location.href = '/admin'
                document.getElementById('result').textContent = 'success'
            }else{
                document.getElementById('result').textContent = 'fail'
                keyInput.value = ''
            }
        }
    }

    xhr.send(JSON.stringify({attempt: keyAttempt}))
}