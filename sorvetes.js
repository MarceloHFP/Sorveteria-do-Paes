let sorveteJson = [
    {
        id: 1,
        name: 'Sorvete de Menta',
        img: 'images/menta.png',
        price: [14.00, 20.00, 26.00],
        sizes: [
          '1 litro',
          '1,5 litro',
          '2 litros'
        ],
        description: 'Pote de sorvete de menta com chocolate importado'
      },
      {
        id: 2,
        name: 'Sorvete de flocos',
        img: 'images/flocos.png',
        price: [14.00, 20.00, 26.00],
        sizes: [
          '1 litro',
          '1,5 litro',
          '2 litros'
        ],
        description: 'Pote de sorvete de flocos importado'
      },
      {
        id: 3,
        name: 'Sorvete napolitano',
        img: 'images/napolitano.png',
        price: [14.00, 20.00, 26.00],
        sizes: [
          '1 litro',
          '1,5 litro',
          '2 litros'
        ],
        description: 'Pote de sorvete napolitano (Chocolate, Creme e Morango) importado'
      },
      {
        id: 4,
        name: 'Sorvete de chocolate ',
        img: 'images/chocolate.png',
        price: [14.00, 20.00, 26.00],
        sizes: [
          '1 litro',
          '1,5 litro',
          '2 litros'
        ],
        description: 'Pote de sorvete de chocolate importado'
      },
      {
        id: 5,
        name: 'Copo de açai com leite condensado',
        img: 'images/açai-leite.png',
        price: [13.00, 18.00, 24.00],
        sizes: [
          '500 ml',
          '700 ml',
          '1 litro'
        ],
        description: 'Copo de açai com leite condensado feito na casa'
      },
      {
        id: 6,
        name: 'Copo de açai com frutas',
        img: 'images/açai-frutas.jpg',
        price: [15.50, 20.50, 26.50],
        sizes: [
          '500 ml',
          '700 ml',
          '1 litro'
        ],
        description: 'Copo de açai com banana e morango feito na casa'
      },
      {
        id: 7,
        name: 'Copo de açai com frutas e nutella',
        img: 'images/açai-nutela.png',
        price: [18.00, 23.00, 29.00],
        sizes: [
          '500 ml',
          '700 ml',
          '1 litro'
        ],
        description: 'Copo de açai com banana, morango e nutella feito na casa'
      },
      {
        id: 8,
        name: 'Pote de açai',
        img: 'images/pote-açai.png',
        price: [22.00, 31.00, 40.00],
        sizes: [
          '1 litro',
          '1,5 litros',
          '2 litros'
        ],
        description: 'Pote de açai feito na casa'
      }
];

let modalkey = 0;

let quantidadeProd = 1;

let quantidadeCart = 0;

let cart = []

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const preenchePizzas = (sorvItem, item, index) => {

  sorvItem.setAttribute('data-key', index);
  sorvItem.querySelector('.card-item--img img').src = item.img;
  sorvItem.querySelector('.card-item--price').innerHTML = formatoReal(item.price[2]);
  sorvItem.querySelector('.card-item--name').innerHTML = item.name;
  sorvItem.querySelector('.card-item--desc').innerHTML = item.description;
  console.log(sorvItem);
}
const abrirModal = () => {
  seleciona('.modal').style.opacity = 0 // transparente
  seleciona('.modal').style.display = 'flex'
  setTimeout(() => seleciona('.modal').style.opacity = 1, 150)
}

const fecharModal = () => {
  seleciona('.modal').style.opacity = 0 // transparente
  setTimeout(() => seleciona('.modal').style.display = 'none', 500)
}

const preencheModal = (item) => {

  seleciona('.Info--desc').innerHTML = item.description;
  seleciona('.modal-img img').src = item.img;
  seleciona('.Info--actualPrice').innerHTML = item.price[2];
  seleciona('.Info h1').innerHTML = item.name;
}

const pegarKey = (e) => {
    let key = e.target.closest('.card-item').getAttribute('data-key')
    console.log('Item clicada ' + key)
    console.log(sorveteJson[key])
    quantidadeProd = 1;
    modalkey = key;
    return key;
}

const preencheTamanhos = (key) => {

  seleciona('.Info--size.selected').classList.remove('selected');

  selecionaTodos('.Info--size').forEach((size, sizeIndex) => {
    (sizeIndex == 2) ? size.classList.add('selected') : '';
    size.querySelector('span').innerHTML = sorveteJson[key].sizes[sizeIndex];
  })
}

const escolherTamanho = (key) => {

  selecionaTodos('.Info--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {

      seleciona('.Info--size.selected').classList.remove('selected');

      size.classList.add('selected');

      seleciona('.Info--actualPrice').innerHTML = formatoReal(sorveteJson[key].price[sizeIndex]);
    })
  })
}

const mudarQuantidade = () => {
  // Ações nos botões + e - da janela modal
  seleciona('.Info--qtmais').addEventListener('click', () => {
      quantidadeProd++
      seleciona('.Info--qt').innerHTML = quantidadeProd
  })

  seleciona('.Info--qtmenos').addEventListener('click', () => {
      if(quantidadeProd > 1) {
          quantidadeProd--
          seleciona('.Info--qt').innerHTML = quantidadeProd	
      }
  })
}

const abrirCarrinho = () => {
  console.log('Qtd de itens no carrinho ' + cart.length)
  if(cart.length > 0) {
      // mostrar o carrinho
    seleciona('.cart-area').style.display = "flex";
      seleciona('header').style.display = 'flex' // mostrar barra superior
  }

  // exibir aside do carrinho no modo mobile
  seleciona('.button-remove').addEventListener('click', () => {
      seleciona('.cart-area').style.display = "none";
  })
}

const atualizarCarrinho = () => {

// mostrar ou nao o carrinho
if(cart.length > 0) {

  // mostrar o carrinho
  seleciona('.cart-area').style.display = "flex";

      // crie as variaveis antes do for
  let subtotal = 0
  let desconto = 0
  let total    = 0

      // para preencher os itens do carrinho, calcular subtotal
  for(let i in cart) {
    // use o find para pegar o item por id
    let Item = sorveteJson.find( (item) => item.id == cart[i].id )
    console.log(Item)

          // em cada item pegar o subtotal
        subtotal += cart[i].price * cart[i].qt
          //console.log(cart[i].price)

    // fazer o clone, exibir na telas e depois preencher as informacoes
    let cartItem = seleciona('.cart-item').cloneNode(true)
    seleciona('.cart-area').append(cartItem)

    let SizeName = cart[i].size

    let Name = `${Item.name} (${SizeName})`

    // preencher as informacoes
    cartItem.querySelector('img').src = Item.img
    cartItem.querySelector('.name').innerHTML = Name
    cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

    // selecionar botoes + e -
    cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
      console.log('Clicou no botão mais')
      // adicionar apenas a quantidade que esta neste contexto
      cart[i].qt++
      // atualizar a quantidade
      atualizarCarrinho()
    })

    cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
      console.log('Clicou no botão menos')
      if(cart[i].qt > 1) {
        // subtrair apenas a quantidade que esta neste contexto
        cart[i].qt--
      } else {
        // remover se for zero
        cart.splice(i, 1)
      }

              (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

      // atualizar a quantidade
      atualizarCarrinho()
    })

    seleciona('.cart-area').append(cartItem)

  } // fim do for

  // fora do for
  // calcule desconto 10% e total
  //desconto = subtotal * 0.1
  desconto = subtotal * 0
  total = subtotal - desconto

  // exibir na tela os resultados
  // selecionar o ultimo span do elemento
  seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
  seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
  seleciona('.total span:last-child').innerHTML    = formatoReal(total)

} else {
  // ocultar o carrinho
  seleciona('.card-area').display.style = "flex"
}
}

const adicionarNoCarrinho = () => {
  seleciona('.Info--addButton').addEventListener('click', () => {
      console.log('Adicionar no carrinho')

      // pegar dados da janela modal atual
    // qual pizza? pegue o modalKey para usar pizzaJson[modalKey]
    console.log("Pizza " + modalkey)
    // tamanho
    let size = seleciona('.Info--size.selected').getAttribute('data-key')
    console.log("Tamanho " + size)
    // quantidade
    console.log("Quant. " + quantidadeProd)
      // preco
      let price = seleciona('.Info--actualPrice').innerHTML.replace('R$&nbsp;', '')
  
      // crie um identificador que junte id e tamanho
    // concatene as duas informacoes separadas por um símbolo, vc escolhe
    let identificador = sorveteJson[modalkey].id+'t'+size

      // antes de adicionar verifique se ja tem aquele codigo e tamanho
      // para adicionarmos a quantidade
      let key = cart.findIndex( (item) => item.identificador == identificador )
      console.log(key)

      if(key > -1) {
          // se encontrar aumente a quantidade
          cart[key].qt += quantidadeProd
      } else {
          // adicionar objeto pizza no carrinho
          let itemS = {
              identificador,
              id: sorveteJson[modalkey].id,
              size, // size: size
              qt: quantidadeProd,
              price: parseFloat(price) // price: price
          }
          cart.push(itemS)
          console.log(itemS)
          console.log('Sub total R$ ' + (itemS.qt * itemS.price).toFixed(2))
      }

      fecharModal()
      abrirCarrinho()
      //atualizarCarrinho()
  })
}



const cartOpen = (item) => {
  const cartArea = seleciona('.cart-area');
  if (item > 0) {
    cartArea.style.display = "flex";
  } else {
    cartArea.style.display = "none";
  }
}

sorveteJson.map((item, index ) => {
  let sorvItem = document.querySelector('.models .card-item').cloneNode(true)

  document.querySelector('.item-area').append(sorvItem)

  preenchePizzas(sorvItem, item, index);

  sorvItem.querySelector('.button-add').addEventListener('click', (e) => {
    e.preventDefault();

    let chave = pegarKey(e);

    abrirModal();

    preencheModal(item);

    preencheTamanhos(chave);

    seleciona('.Info--qt').innerHTML = quantidadeProd;
    
    escolherTamanho(chave);

  })
})

seleciona('.Info--cancelButton').addEventListener('click', () => {
  fecharModal();
})

mudarQuantidade();
adicionarNoCarrinho();
