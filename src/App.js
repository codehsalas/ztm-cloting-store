import { Routes , Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";
import Contact from "./routes/contact/contact.component";


const Shop = () => {
  return <h1>Dentro de mi Shopppp</h1>
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};
export default App;
