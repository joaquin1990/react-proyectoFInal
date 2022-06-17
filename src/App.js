import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./componentes/globals/navbar/Navbar.jsx";
import Footer from "./componentes/globals/footer/Footer.jsx";
import ItemDetailContainer from "./componentes/itemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./componentes/itemListContainer/ItemListContainer";
import Cart from "./componentes/cart/Cart";
import CartContextProvider from "./componentes/context/CartContext";
import OrderContextProvider from "./componentes/context/OrderContext";
import Payment from "./componentes/cart/form/Payment";
import Admin from "./componentes/globals/navbar/Admin";
import Form1 from "./componentes/cart/form/Form1";

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
                <Route path="/form1" element={<Form1 />} />
                <Route path="/admin" element={<Admin />} />
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
