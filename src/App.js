import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./componentes/globales/navbar/Navbar.jsx";
import Footer from "./componentes/globales/footer/Footer.jsx";
import ItemDetailContainer from "./componentes/itemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./componentes/itemListContainer/ItemListContainer";
import Cart from "./componentes/cart/Cart";
import CartContextProvider from "./componentes/context/CartContext";
import OrderContextProvider from "./componentes/context/OrderContext";
import Form from "./componentes/cart/form/Form";
import Payment from "./componentes/cart/Payment";

function App() {
  return (
    <BrowserRouter>
      <OrderContextProvider>
        <CartContextProvider>
          <div className="App">
            <NavBar />
            <main>
              <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:id" element={<ItemListContainer />} />
                <Route path="/detail/:id2" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/form" element={<Form />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartContextProvider>
      </OrderContextProvider>
    </BrowserRouter>
  );
}

export default App;
