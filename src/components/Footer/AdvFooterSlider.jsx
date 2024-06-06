import React from 'react';


const AdvFooterSlider = () => {
  const items = [
    {
      imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog1.png',
      imageAlt: 'Jack Russel',
      title: 'Jack Russel',
      description: 'Chó sục Russell'
    },
    {
      imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog2.png',
      imageAlt: 'Parson Russel',
      title: 'Parson Russel',
      description: 'Chó sục Russell'
    },
    {
      imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog3.png',
      imageAlt: 'Golden Retriever',
      title: 'Golden Retriever',
      description: 'Gâu Đần'
    },
    {
        imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog4.png',
        imageAlt: 'Yorkie',
        title: 'Yorkie',
        description: 'Giống chó sục'
      },
      {
        imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog5.png',
        imageAlt: 'Pull Pháp',
        title: 'Pull Pháp',
        description: 'Giống chó bò'
      },
      {
        imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog6.png',
        imageAlt: 'Pull Pháp',
        title: 'Pull Pháp',
        description: 'Giống chó bò'
      },
      {
        imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog7.png',
        imageAlt: 'Beagle',
        title: 'Beagle',
        description: 'Chó săn thỏ'
      },
      {
        imageUrl: 'https://matpetfamily.com/wp-content/uploads/2018/01/dog8.png',
        imageAlt: 'PUG',
        title: 'PUG',
        description: 'Móm mũm mĩm'
      }
    // Thêm các item khác tương tự
  ];



return (
    <div className="s7upf-slider adv-footer-slider flex flex-row mt-10">
      {items.map((item, index) => (
        <div className="item-adv-footer flex flex-col relative mr-10  h-[200px]" key={index}>
          <div className="group">
            <div className="info-adv-footer relative hidden group-hover:block group-hover:animate-rotate">
              <h3 className="title18">{item.title}</h3>
              <p className="desc">{item.description}</p>
              <div className="absolute right-0 mb-3 ">
                <img src="https://matpetfamily.com/wp-content/themes/haustiere/assets/css/images/icon/arrow.png" alt="arrow" />
              </div>
            </div>
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              width="150"
              height="185"
              className="group-hover:animate-wobble"
            />
              
          </div>
      
        </div>
      ))}
     
    </div>
  );
}


export default AdvFooterSlider;