import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and airborne toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Restores moisture and purifies indoor air naturally.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Easy-to-grow plant with large toxin-absorbing leaves.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/09/16/aloe-vera-3283344_1280.jpg", description: "Purifies air and yields soothing gel for burn care.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/lavender-2516623_1280.jpg", description: "Calming aroma that promotes relaxation and sleep.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/05/16/18/16/jasmine-3406627_1280.jpg", description: "Sweet fragrance that uplifts mood and reduces stress.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Fragrant herb that enhances memory and concentration.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2017/03/23/19/57/mint-2169305_1280.jpg", description: "Refreshing scent and versatile culinary leaf.", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2016/07/28/18/43/lemon-balm-1548810_1280.jpg", description: "Citrusy aroma known for stress relief properties.", cost: "$12" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/eucalyptus-1846152_1280.jpg", description: "Distinctive scent that aids respiratory clearways.", cost: "$25" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/08/00/01/coneflower-560410_1280.jpg", description: "Boosts immune system and fights seasonal colds.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2016/01/27/18/24/peppermint-1165038_1280.jpg", description: "Relieves digestive discomfort and headaches.", cost: "$13" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/11/19/44/thyme-2305199_1280.jpg", description: "Antimicrobial plant used for throat and immunity care.", cost: "$11" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/14/08/08/marigold-4336528_1280.jpg", description: "Soothes skin irritations and promotes quick healing.", cost: "$14" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2017/06/18/21/37/chamomile-2417551_1280.jpg", description: "Calming herb used widely to brew herbal tea.", cost: "$12" },
        { name: "Holy Basil (Tulsi)", image: "https://cdn.pixabay.com/photo/2021/09/20/06/55/tulsi-6640037_1280.jpg", description: "Adaptogenic herb that helps body cope with stress.", cost: "$15" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {/* Dynamic Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={handlePlantsClick} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" onClick={handleCartClick} className="cart-icon-container">
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {/* View Switcher */}
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plant-cards-grid">
                {categoryObj.plants.map((plant, plantIdx) => {
                  const isAdded = addedNodes[plant.name] || cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={plantIdx} className="plant-card">
                      <img src={plant.image} alt={plant.name} className="plant-image" />
                      <h3 className="plant-name">{plant.name}</h3>
                      <p className="plant-description">{plant.description}</p>
                      <p className="plant-cost">{plant.cost}</p>
                      <button
                        className={`add-to-cart-btn ${isAdded ? 'disabled' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
