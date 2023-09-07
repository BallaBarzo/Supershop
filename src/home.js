import Sidebar from "./sidebar";
import { useEffect, useState } from 'react';
import Modal from "react-modal";







const Home = ({closeModal} ) => {
  const [product, setProduct] = useState(null);
  const [show, setShow] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);



   
    const [formData, setFormData] = useState({
      title: '',
      price: '',
      description: '',
      image: '',
      category: 'clothing', 
    });
  
    

    const [sortOption, setSortOption] = useState('normal');
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setLoading(true); 
      
   
        setTimeout(() => {
          fetch("http://localhost:3030/product", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData),
          })
            .then((res) => {
              alert('saved successfully');
              setLoading(false); 
            })
            .catch((err) => {
              console.log(err.message);
              setLoading(false);
            });
      
          closeModal();
        }, 2000); 
      };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const customStyles = {
    content: {
        position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            height: "80%",
            border: "none",
            background: "white",
            overflow: "auto",
            borderRadius: "10px",
            outline: "none",
            padding: "20px",
            
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
      },
  };
  
  
  Modal.setAppElement("#root");

  const openCardDetails = (data) => {
    setSelectedCard(data);
  };

  const closeCardDetails = () => {
    setSelectedCard(null);
  };

  const [selectedCard, setSelectedCard] = useState(null);

 


  useEffect(() => {
    
    let apiUrl = 'http://localhost:3030/product';
  
  
    if (sortOption === 'lowToHigh') {
      apiUrl += '?_sort=price';
    } else if (sortOption === 'highToLow') {
      apiUrl += '?_sort=price&_order=desc';
    }
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resp) => {
        setTimeout(() => {
          setProduct(resp);
          setShow(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
        setShow(false);
      });
  }, [sortOption,handleSubmit]);

  return (
    <div>
    <div>
        <div className="headbar">
    <div className="head-container">
      <p className="headbartextb">All Products</p>
      <p className="headbartext">Price sorting</p>
      <select
            name="sortOption"
            className="wButton"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="normal">Normal</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
      <button className="gButton" onClick={openModal}>Add product</button>
              
                </div>
            </div>
        </div>
        <div >
        { isFormOpen && (
            <div >
           
           <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Add new product"
>
  <div className="addform">
  <h2 >Add new product</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Price
          <input
            type="number"
            name="price"
            value={"$"+formData.price}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Description
          <input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-input">
          </input>
        </label>
      </div>
      <div className="form-group">
        <label>
          Image
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Category
          <input
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
          >
           
          </input>
        </label>
      </div>
      {}
      <button onClick={closeModal}  style={{ marginLeft: '22ch' }} className=" aa" >Cancel</button>
      {}
      <button  type="submit" className=" ab">
  {loading ? <img src="img/wloading.png" className="loading-icon" style={{ height:'25px', width:'25px' ,padding:0}} /> : "Add"}
</button>
    </form>
  </div>
</Modal>
          </div>
        
          )}
        </div>
      <div className="home">
        <Sidebar />
        <h1></h1>
      </div>
      {show ? ( 
        <div>
          <img src="img/loading.png" className="loading-icon" style={{marginLeft:'91ch',marginTop:'30ch'}} />
          <h1 className="homeload">Loading...</h1>
        </div>
      ) : (
        <div className="home">
          <div className="card-container" >
            {product &&
              product.map((prod, index) => (
                <div key={index} className="card" onClick={() => openCardDetails(prod)}>
                  <img src={prod.image} className="card-image" />
                  <div className="card-content">
                    <div className="card-header">
                      <h2 className="card-title">{prod.title}</h2>
                      <h2 className="card-price">{"$" + prod.price}</h2>
                    </div>
                    <p className="card-description">{prod.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
       {selectedCard && (
        <div className="card-details-popup">
          <button className="close-button" onClick={closeCardDetails}>
            X
          </button>
          <h2>{selectedCard.title}</h2>
          <div className="popup-content">
            <div className="left-column">
              <img src={selectedCard.image} className="popup-image" />
            </div>
            <div className="right-column">
              <p className="popup-price">{"$" + selectedCard.price}</p>
              <p className="popup-category">{selectedCard.category}</p>
              <p className="popup-description">{selectedCard.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;