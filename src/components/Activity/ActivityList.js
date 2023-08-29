import React from "react";
import classes from "./ActivityList.module.css";
import ActivityItem from "./ActivityItem";
import { useGetBalanceAndMovementsQuery } from "../../services/walletService";

const ActivityList = (props) => {
  const { data } = useGetBalanceAndMovementsQuery();
  return (
    <ul className={classes.container}>
      {data?.movements
        ? data.movements.map((mov) => {
            const date = new Date(mov.date);
            console.log(date.getFullYear());
            return (
              <ActivityItem
                key={mov.date}
                title={`${mov.description} from ${mov.sender}`}
                date={`${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`}
                amount={mov.amount}
              />
            );
          })
        : null}
    </ul>
  );
};

export default ActivityList;
