import { useSelector } from "react-redux";
import ActivityContainer from "../components/Activity/ActivityContainer";
import BalanceContainer from "../components/Balance/BalanceContainer";
import DolarContainer from "../components/Dolar/DolarContainer";
import Header from "../components/Layout/Header";
import MovementsContainer from "../components/Movements/MovementsContainer";
import classes from "./AppPage.module.css";
const AppPage = () => {
  const user = useSelector((state) => state.user);
  setTimeout(() => console.log("user", user), 3000);

  return (
    <>
      <Header />
      <main className={classes.container}>
        <DolarContainer />
        <BalanceContainer />
        <MovementsContainer />
        <ActivityContainer />
      </main>
    </>
  );
};

export default AppPage;
