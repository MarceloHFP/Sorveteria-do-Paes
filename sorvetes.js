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

const addItemtoCart = () => {

  let size = seleciona('.Info--size.selected').getAttribute('data-key');

  console.log(modalkey);

  console.log(size);
  console.log(quantidadeProd);
  const cartItemTemplate = seleciona('.cart-item');
  const cartItem = cartItemTemplate.cloneNode(true);
  seleciona('.cart-area').append(cartItem);
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

seleciona('.Info--addButton').addEventListener('click', (e) => {
  fecharModal();
  quantidadeCart++;
  addItemtoCart();
  cartOpen(quantidadeCart);
})

mudarQuantidade();
