import Header from "./Header/Header";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import Diaries from "./Diaries/Diaries";
import Profile from "./Profile/Profile";
import Add from "./Diaries/Add";
import DiaryUpdate from "./Diaries/DiaryUpdate";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.login());
    }
  }, [localStorage]);
  return (
    <>
      <header>
        <Header />
      </header>

      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diaries' element={<Diaries />} />
          <Route path='/auth' element={<Auth />} />
          {isLoggedIn && (
            <>
              <Route path='/add' element={<Add />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/post/:id' element={<DiaryUpdate />} />
            </>
          )}
        </Routes>
      </section>

    </>
  );
}

export default App;
