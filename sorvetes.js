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

let quantidadeCart = 0;

let cart = []

let logado = false;

let itens = [];

let id;


const getItensDB = () => JSON.parse(localStorage.getItem("dbclient")) ?? []
const setItensDB = () => localStorage.setItem('dbclient', JSON.stringify(itens))

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const abrirLogin = () => seleciona('.login').style.display = "flex"

const exitPress = () => {
  seleciona('.exit').addEventListener('click', (e) => {
    logado = false;
    seleciona('.btExit').style.display = "none";
  })
}
const iconPress = () => {
  seleciona('.iconHeader').addEventListener('click', (e) => {
    if(!logado) {
    modalClose()
    abrirModal()
    abrirLogin()
  } else {
    seleciona('.btExit').style.display = "flex";
  }
  })
}

setCadasItens = () => {
  seleciona('.btCadas').addEventListener('click', (e) => {
    
    let a = 0;
    let name = seleciona('.nome').value
    let sobrenome = seleciona('.sobrenome').value
    let endereco = seleciona('.endereco').value
    let cpf = seleciona('.cpf').value
    let email = seleciona('.cdEmail').value.toLowerCase();
    let senha = seleciona('.cdSenha').value
    let itensR = getItensDB();
    
    itensR.forEach((item) => {
      if(item.email == email || item.cpf == cpf) {
        a++;
        alert("Email ou CPF ja cadastrado")
      }
    }) 

    if(name != "" && sobrenome != "" && endereco != "" && cpf != "" && email != "" && senha != "" && a == 0) {
    itens.push({'nome': name, 'sobrenome': sobrenome, 'endereco': endereco, 'cpf': cpf, 'email': email, 'senha': senha})
    setItensDB()
    modalClose()
    abrirLogin()
    }

    console.log(itens)
  })
}

const login = () => {
  seleciona('.btLogin').addEventListener('click', (e) => {

    let dados = getItensDB(); 
    let email = seleciona('.lgEmail').value.toLowerCase();
    let senha = seleciona('.lgSenha').value

    dados.forEach((item, index) => {
      if(item.email == email && item.senha == senha) {
        id = index;
      alert("Login efetuado");
      logado = true;
      modalClose()
      fecharModal()
    } else alert("Email ou senha invalido")
    })
  })
}

const modalClose = () => {

  seleciona('.login').style.display = "none";
  seleciona('.cadastro').style.display = "none";
  seleciona('.modalbody').style.display = "none";
  seleciona('.lgEmail').value = "";
  seleciona('.lgSenha').value= "";
  const modal = seleciona('.modal')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal') !== -1) {
     modal.style.display = "none"
     seleciona('.login').style.display = "none";
     seleciona('.cadastro').style.display = "none";
     seleciona('.modalbody').style.display = "none";
    }
  }
}

const abrirCadas = () => {
  seleciona('.toCadas').addEventListener('click', (e) => {
  seleciona('.cadastro').style.opacity = 0;
  seleciona('.modal').style.opacity = 0;
  setTimeout(() => seleciona('.modal').style.opacity = 1, 130)
  setTimeout(() => seleciona('.cadastro').style.opacity = 1, 150)
  seleciona('.login').style.display = "none"
  seleciona('.cadastro').style.display = "flex"
  })
}

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
  seleciona('.Info--actualPrice').innerHTML = formatoReal(item.price[2]);
  seleciona('.Info h1').innerHTML = item.name;
}

const pegarKey = (e) => {
    let key = e.target.closest('.card-item').getAttribute('data-key')
    //console.log('Item clicada ' + key)
    //console.log(sorveteJson[key])
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
  if(cart.length != 0) {
    seleciona('.cart-area').style.display = "flex";
  } else {
    seleciona('.cart-area').style.display = "none";
  }
}

const adicionarNoCarrinho = () => {
 
  seleciona('.Info--addButton').addEventListener('click', (e) => {

    let size = seleciona('.Info--size.selected').getAttribute('data-key')

    let price = seleciona('.Info--actualPrice').innerHTML.replace('R$&nbsp;', '')

    let quant = quantidadeProd;
    quantidadeProd = 1;

    let identificador = modalkey+"t"+size;

    let key = cart.findIndex( (item) => item.identificador == identificador )
        //console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quant
            console.log(cart[key].qt)
        } else {
            // adicionar objeto pizza no carrinho
            let item = {
                identificador,
                id: sorveteJson[modalkey].id,
                size, 
                qt: quant,
                price: parseFloat(price) 
            }
            cart.push(item)
          }
  
          fecharModal()
          abrirCarrinho()
          atualizarCarrinho()
  })
}

const atualizarCarrinho = () => {

  seleciona('.itens-cart').innerHTML = '';

  let subtotal = 0;
  let total = 0;

    for(let i in cart) {

      let item = sorveteJson.find( (item) => item.id == cart[i].id )
			console.log(item)
      console.log(cart)
      
      subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

      seleciona('.total').innerHTML = formatoReal(subtotal);

	    // fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.cart-item').cloneNode(true)
      seleciona('.itens-cart').append(cartItem)

			let sizeName = cart[i].size

			let name = `${item.name} (${sizeName})`

			// preencher as informacoes
			cartItem.querySelector('img').src = item.img
			cartItem.querySelector('.desc-cart .name').innerHTML = name
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
      cartItem.querySelector('.price').innerHTML = `Preço: ${formatoReal(cart[i].price)}`

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

                (cart.length < 1) ? seleciona('.cart-area').style.display = 'none' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.itens-cart').append(cartItem)

		} 
}

const finalizarCompra = () => {
  seleciona('.buy').addEventListener('click', (e) => {
  let dados = getItensDB()
  alert(`Compra finalizada. Compra chega em 1 hora em ${dados[id].endereco}`)
  seleciona('.cart-area').style.display = "none";
  cart = [];
  seleciona('.itens-cart').innerHTML = '';
  } )
}

sorveteJson.map((item, index ) => {
  let sorvItem = document.querySelector('.models .card-item').cloneNode(true)

  document.querySelector('.item-area').append(sorvItem)

  preenchePizzas(sorvItem, item, index);

  sorvItem.querySelector('.button-add').addEventListener('click', (e) => {
    
    abrirModal();

    if(!logado) {
      abrirLogin()
    } else {

    seleciona('.modalbody').style.display = "flex"

    e.preventDefault();

    let chave = pegarKey(e);

    preencheModal(item);

    preencheTamanhos(chave);

    seleciona('.Info--qt').innerHTML = quantidadeProd;
    
    escolherTamanho(chave);
    }
  })
})

seleciona('.Info--cancelButton').addEventListener('click', () => {
  fecharModal();
})

modalClose();
iconPress();
mudarQuantidade();
adicionarNoCarrinho();
finalizarCompra();
abrirCadas();
setCadasItens();
login();
exitPress();