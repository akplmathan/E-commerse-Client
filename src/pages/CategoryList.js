import React,{useState,useEffect} from "react";
import banner1 from '../assets/banner1.png';
import axios from 'axios'

const bannerImages = [
  'https://mindstacktechnologies.com/wordpress/wp-content/uploads/2018/01/ecommerce-banner.jpg','https://previews.123rf.com/images/arrow/arrow1508/arrow150800011/43834601-online-shopping-e-commerce-flat-design-concept-banner-background.jpg',
];


const CarouselWithCategories = () => {
  const [categories,setCategories] = useState([])

  useEffect(()=>{
    const GetCategories = async()=>{
      const response = await axios.get('http://localhost:4000/product/category');
        setCategories(response.data.category)
    }

    GetCategories()
  },[])
  

  return (
    <div>
      {/* Categories Section */}
      <div className="d-flex justify-content-center gap-3 overflow-auto py-3">
        {categories?.map((category, index) => (
        <a href={`/products/${category.name}`} style={{textDecoration:'none'}}>
            <div key={index} className="text-center">
            <div className="rounded-circle overflow-hidden" style={{ width: '70px', height: '70px', border:'4px solid red'}}>
              <img src={category.image} alt={category.name} className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'contain',  }} />
            </div>
            <div className="mt-2" style={{ fontSize: '14px', fontWeight: '500', color: '#212121',textDecoration:'none' }}>{category.name}</div>
          </div>
        </a>
        ))}
      </div>

      {/* Carousel Section */}
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
  {
    bannerImages.map((item,i)=>{
      return   <div key={i} class="carousel-item active">
      <img src={item} class="d-block w-100" alt="..."/>
    </div>
    })
    
  }
  
  </div>
  <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon " aria-hidden="true"></span>
    <span class="visually-hidden ">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  );
};

export default CarouselWithCategories;
