import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { App_dispatch, Root_state } from "../store";

export const Use_app_dispatch = () => useDispatch<App_dispatch>();
export const Use_app_selector: TypedUseSelectorHook<Root_state> = useSelector;
