import {HelmetData} from "react-helmet";

export type RootComponentHelmetData = {
    helmet?: { [i in keyof HelmetData]?: string; }
}
