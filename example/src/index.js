import Connection from 'flespi-io-js'

let connector = new Connection({socketConfig: {clientId: 'ThisIsMe!'}})

let inputToken = document.querySelector('#token'),
    submitToken = document.querySelector('#submit'),
    getChannelsButton = document.querySelector('#getChannels'),
    fileButton = document.querySelector('#fileData')

submitToken.addEventListener('click', async () => {
    connector.token = inputToken.value
    try {
        let grants = await connector.socket.subscribe({name: '#', handler: render})
        console.log(JSON.stringify(grants))
    } catch (e) {
        console.log(e)
    }
})

getChannelsButton.addEventListener('click', async () => {
    // let channelsData = await connector.gw.getChannels('all', {})
    let channelsData = await connector.http.gw.channels.get('all', {})
    document.querySelector('#http').innerHTML = JSON.stringify(channelsData.data.result, null, 1)
})

function render (data, topic) {
    let element = document.createElement('pre'),
        parent = document.querySelector('#mqtt')
    element.innerHTML = topic + JSON.stringify(JSON.parse(data.toString()), null, 1)
    parent.appendChild(element)
}

fileButton.addEventListener('change', async function (e) {
    // for nodejs: connector.storage.postCdnsFiles(ID, fs.createReadStream('./file'), JSON.stringify({'auto_ttl': 11234}))
    let id = await connector.http.storage.cdns.files.post(7, fileButton.files[0], JSON.stringify({'auto_ttl': 11234}))
})