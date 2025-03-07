import React, { createContext, useState } from "react";
import { modelPredict } from "../utils/models";

interface IDashboardContexType {
	predict: (x: number, y: number) => number;
}

export const DashboardContex = createContext<IDashboardContexType | null>(null);

export const DashboardContexProvider = ({ children }: React.PropsWithChildren) => {
	const predict = (x: number, y: number) => {
		return modelPredict(x, y)
	};

	return <DashboardContex value={{ predict }}>{children}</DashboardContex>;
};
