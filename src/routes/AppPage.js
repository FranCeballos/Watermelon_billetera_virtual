import ActivityContainer from "../components/Activity/ActivityContainer";
import BalanceContainer from "../components/Balance/BalanceContainer";
import DolarContainer from "../components/Dolar/DolarContainer";
import Header from "../components/Layout/Header";
import MovementsContainer from "../components/Movements/MovementsContainer";
import classes from "./AppPage.module.css";
const AppPage = () => {
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
