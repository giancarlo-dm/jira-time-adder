import { FC } from "react";

import classes from "./SeriesItem.module.scss";

export const SeriesItem: FC = () => {

    return (
        <div className={classes.item}>
            <span/>
            <button className={classes.deleteButton} />
        </div>
    );
};
