const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = document.querySelector('.modal-close');
  const goodsList = document.querySelector('.long-goods-list');
  const cartTable = document.querySelector('.cart-table__goods');
  const cartPrice = document.querySelector('.card-table__total');
  const modalForm = document.querySelector('.modal-form');

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      })
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.filter((item) => {
      return item.id !== id;
    })

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  }

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    })

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  }

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCart = cart.map((item) => {
      if (item.id === id) {
        if (item.count > 0) {
          item.count--;
        }
      }
      return item;
    })

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  }

  const renderCartGoods = (goods) => {
    let totalPrice = 0;
    cartTable.innerHTML = '';
    cartPrice.innerHTML = `$${totalPrice}`;

    goods.forEach((good) => {
      const table = document.createElement('tr');
      const price = +good.price * +good.count;
      totalPrice += price;

      table.innerHTML =
        `<td>${good.name}</td>
        <td>$${good.price}</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${good.count}</td>
        <td><button class="cart-btn-plus">+</button></td>
        <td>$${price}</td>
        <td><button class="cart-btn-delete">x</button></td>`

      cartTable.append(table);
      cartPrice.innerHTML = `$${totalPrice}`;

      table.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id);
        } else if (event.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id);
        } else if (event.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id);
        }
      })
    });
  }

  const sendForm = () => {
    const name = modalForm.querySelector('input[name=nameCustomer]');
    const phone = modalForm.querySelector('input[name=phoneCustomer]');
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    if (name.value.length && phone.value.length && cartArray.length > 0) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          cart: cartArray,
          name: name.value,
          phone: phone.value
        })
      }).then(() => {
        cart.style.display = '';
      }).then(() => {
        name.value = '';
        phone.value = '';
        localStorage.removeItem('cart');
      })
    }
  }

  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendForm();
  })

  cartBtn.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    renderCartGoods(cartArray);

    cart.style.display = 'flex';
  })

  closeBtn.addEventListener('click', () => {
    cart.style.display = '';
  })

  cart.addEventListener('click', (event) => {
    if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
      cart.style.display = '';
    }
  })

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cart.style.display = '';
    }
  })

  if (goodsList) {
    goodsList.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart');
        const goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    })
  }
}

export default cart;
