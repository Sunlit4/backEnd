const socket = io();

const { denormalize, schema} = normalizr

socket.on('connection', (data) => {

    switch (Object.keys(data).toString()) {
        
        case "products":
            $('#cardRow').empty()
            data["products"].map( (product) => {
                $('#cardRow').append(`
                    <div class="card">
                        <img src=${product["thumbnail"] || "https://i.ibb.co/6nDS7nX/goose.jpg"} style="width:100%">
                        <h2>${product["title"]}</h2>
                        <h3 class="price">${"$" + product["price"]}</h3>
                    </div>
                `)
            })
        break;
    }

})

$("#productForm").submit( () => {
    const title = $('#title').val()
    const thumbnail = $('#thumbnail').val()
    const detail = $('#detail').val()
    const price = $('#price').val()
    const stock = $('#stock').val()

    socket.emit('postProduct', {"title": title, "thumbnail": thumbnail, "detail": detail, "price": parseInt(price), "stock": parseInt(stock)})

    $('#title').val('')
    $('#thumbnail').val('')
    $('#detail').val('')
    $('#price').val('')
    $('#stock').val('')

    return false; 
})

socket.on('postProduct', function(product) {
    $('#cardRow').append(`
        <div class="card">
            <img src=${product["thumbnail"] || "https://i.ibb.co/6nDS7nX/goose.jpg"} style="width:100%">
            <h2>${product["title"]}</h2>
            <h3 class="price">${"$" + product["price"]}</h3>
        </div>
    `)
})

//////////////////////////////////////////////////////

$("#chat").submit( () => {
    const name = $('#name').val()
    const lastname = $('#lastname').val()
    const age = $('#age').val()
    const alias = $('#alias').val()
    const avatar = $('#avatar').val()
    const email = $('#email').val()
    const text = $('#message').val()

    socket.emit('chatter', {text:text, author:{
        name: name,
        lastname: lastname,
        age: parseInt(age),
        alias: alias,
        avatar: avatar,
        id: email
    }})

    $('#message').val('')

    return false; 
})

socket.on('chatter', function(message) {
    $('#chat-messages').append($('<li>').html(`<span style="color: ${randomColor({luminosity: 'light'})}">
    <img src=${message["author"].avatar || "https://i.im.ge/2022/09/23/1hVLEc.Goose.png"} style="width:25px;height:25px;border-radius:50%">
    ${message["author"].alias}: 
    <b>${message["text"]}</b>
    </span>`))
})