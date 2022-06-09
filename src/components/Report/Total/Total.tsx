import { FC, Fragment } from "react";

export const Total: FC = () => {

    return (
        <Fragment>
            <h4>Total spent in bugs:</h4>
            <div className="report__total">
                <div className="control-group horizontal">
                    <label htmlFor="totalBugsPoints">Points</label>
                    <input id="totalBugsPoints" type="text" className="control"
                           disabled />
                </div>
                <div className="control-group horizontal">
                    <label htmlFor="totalBugsTime">Time</label>
                    <input id="totalBugsTime" type="text" className="control"
                           disabled />
                </div>
            </div>
        </Fragment>
    );
};
