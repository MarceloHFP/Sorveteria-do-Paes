sorveteJson.map((item, index ) => {
    console.log(item)
    let sorvItem = document.querySelector('.models .card-item').cloneNode(true)

    document.querySelector('.itemArea').append(sorvItem)
})
