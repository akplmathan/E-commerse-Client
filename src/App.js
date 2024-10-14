import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Nav";
import SignUpForm from "./pages/Register";
import LoginPage from "./pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./redux/slice/userSlice";
import CategoryList from "./pages/CategoryList";
import Home from "./components/Home";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import MyAccount from "./pages/ChangeDetails";
import AccountPage from "./pages/Account";
import AddressPage from "./pages/Address";
import YourOrders from "./pages/YourOrders";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderReviewPage from "./pages/OrderReview";
import { addProduct } from "./redux/slice/productSlice";
import axios from "axios";
import ConfirmedPage from "./pages/OrderConfirmedPage";
import ProductView from "./pages/ProductView";
import PrivateRoute from "./private-route/PrivateRoute";
import Footer1 from "./components/Footer1";
import {useNavigate} from 'react-router-dom'
import AboutUs from "./paymentPages/AboutUs";
import ContactUs from "./paymentPages/ContactUs";
import PrivacyPolicy from "./paymentPages/PrivacyPolicy";
import TermsCondition from "./paymentPages/TermsCondition";
import RefundPolicy from "./paymentPages/RefundPolicy";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const user = useSelector((state) => state.userInfo.user);
  const product = useSelector((state) => state.productInfo.product);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dispatch = useDispatch();

  const GetAllProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/product/getAllProducts`
    );
    dispatch(addProduct(response.data));
  };

  const category = product?.map((item)=> item.category);
  const categories = [...new Set(category)]

  const handleResultClick = (name) => {
    setSearchQuery(name);
    if(name == ''){
      return
    }
    const filterResult = categories.filter((item)=>item.toLowerCase().includes(name.toLowerCase()))
    const idFilter = product.find((item)=> item.name.toLowerCase() == name.toLowerCase());
    console.log({filterResult,idFilter});

    if(filterResult.length>0){
      navigate(`/products/${filterResult[0]}`)
    }else if(idFilter){
      navigate(`products/${idFilter.category}/product-view/${idFilter._id}`)
    }

   
  
    setShowSearchResults(false);
  };

  useEffect(() => {
    dispatch(verifyToken(token));
    GetAllProducts();
  }, [token]);

  //cart details
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/cart/${user._id}`
      );
      setCart(res.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const location = useLocation();

  // Determine if the current path is for login or signup
  const hideFooter1 =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <div style={{ backgroundColor: "#f1f1f1 " }}>
      <Header
        cart={cart}
        products={product}
        handleResultClick={handleResultClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowSearchResults={setShowSearchResults}
        showSearchResults={showSearchResults}
      />
      <Navbar products={product}/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CategoryList />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />

        <Route
          path="products/:category"
          element={<CategoryProducts cart={cart} fetchCart={fetchCart} />}
        />
        <Route
          path="products/:category/product-view/:id"
          element={<ProductView cart={cart} fetchCart={fetchCart} />}
        />
        <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/contact-us"element={<ContactUs/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions"element={<TermsCondition/>} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          <Route path="/change-password" element={<ChangePassword/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          

        <Route element={<PrivateRoute />}>
          <Route path="/order-confirmed" element={<ConfirmedPage />} />
          <Route path="/confirm-order" element={<OrderConfirmation />} />
          <Route path="/order-review" element={<OrderReviewPage />} />
          <Route path="/orders" element={<YourOrders />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/change-details" element={<MyAccount />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Route>
      </Routes>
      {!hideFooter1 && <Footer1 />}
      {hideFooter1 && <Footer />}
    </div>
  );
};

export default App;
