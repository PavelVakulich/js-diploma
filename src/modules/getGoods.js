
const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link');
  const more = document.querySelector('.more');

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

  const getData = (value, category) => {
    fetch('https://623a5818b5292b8bfcb4263a.mockapi.io/v1/Wildberries')
      .then((response) => response.json())
      .then((data) => {
        const array = category ? data.filter((item) => item[category] === value) : data;

        localStorage.setItem('goods', JSON.stringify(array));

        if (window.location.pathname !== 'goods.html') {
          window.location.href = '/goods.html';
        } else {
          renderGoods(array);
        }
      })
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      getData(linkValue, category);
    })
  })

  if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }

  if (more) {
    more.addEventListener('click', (event) => {
      event.preventDefault();
      getData();
    })
  }
}



export default getGoods;
