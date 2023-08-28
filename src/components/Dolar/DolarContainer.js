import React from "react";
import classes from "./DolarContainer.module.css";
import DolarItem from "./DolarItem";
import { useGetDolarValueInArsQuery } from "../../services/dolarService";

const DolarContainer = (props) => {
  const { data } = useGetDolarValueInArsQuery();
  const initialValue = { value_buy: "...", value_sell: "..." };
  const { value_buy: blueBuy, value_sell: blueSell } =
    data?.blue || initialValue;
  const { value_buy: oficialBuy, value_sell: oficialSell } =
    data?.oficial || initialValue;
  return (
    <section className={classes.container}>
      <DolarItem buy={blueBuy} sell={blueSell} />
      <DolarItem buy={oficialBuy} sell={oficialSell} />
    </section>
  );
};

export default DolarContainer;
