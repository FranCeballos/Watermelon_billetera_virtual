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
      <DolarItem title="Blue Dolar in $ARS" buy={blueBuy} sell={blueSell} />
      <DolarItem
        title="Oficial Dolar in $ARS"
        buy={oficialBuy}
        sell={oficialSell}
      />
    </section>
  );
};

export default DolarContainer;
