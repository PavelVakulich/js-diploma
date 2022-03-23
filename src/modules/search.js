const search = function () {
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  const renderGoods = (goods) => {
    const goodsList = document.querySelector('.long-goods-list');
    goodsList.innerHTML = '';

    goods.forEach((good) => {
      const goodBlock = document.createElement('div');
      goodBlock.className = 'col-lg-3 col-sm-6';

      const goodCard = document.createElement('div');
      goodCard.className = 'goods-card';

      const label = document.createElement('span');
      label.className = `${good.label ? 'label' : 'd-none'}`;
      label.textContent = good.label;

      const image = document.createElement('img');
      image.className = 'goods-image';
      image.src = good.img;
      image.atl = good.name;

      const title = document.createElement('h3');
      title.className = 'goods-title';
      title.textContent = good.name;

      const description = document.createElement('p');
      description.className = 'goods-description';
      description.textContent = good.description;

      const button = document.createElement('button');
      button.className = 'button goods-card-btn add-to-cart';
      button.dataset.id = good.id;

      const price = document.createElement('span');
      price.className = 'button-price';
      price.textContent = `$${good.price}`;

      button.append(price);
      goodCard.append(label, image, title, description, button);
      goodBlock.append(goodCard);
      goodsList.append(goodBlock);

      return goodsList;
    })
  }

  const getData = (value) => {
    fetch('https://623a5818b5292b8bfcb4263a.mockapi.io/v1/Wildberries')
      .then((response) => response.json())
      .then((data) => {
        const array = data.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase())
        })

        localStorage.setItem('goods', JSON.stringify(array));

        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html';
        } else {
          renderGoods(array);
        }
      })
  }

  try {
    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      getData(input.value);
    })
  } catch (err) {
    console.error(err.message);
  }
}

export default search;
