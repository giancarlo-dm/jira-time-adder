import { useSelector } from "react-redux";

import { RootState } from "../store";
import { JiraPoints } from "./models";


export const useJiraPointsSlice = () => useSelector<RootState, JiraPoints>(state => state.jiraPoints);
