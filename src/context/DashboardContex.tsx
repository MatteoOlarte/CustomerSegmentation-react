import React, { createContext, useEffect, useState } from "react";
import { modelPredict } from "../utils/models";
import { ScatterDataset } from "../utils/scatter-types";

export interface IDashboardContexType {
	predict: (x: number, y: number) => number;
	datasets: ScatterDataset[];
}

export const DashboardContex = createContext<IDashboardContexType | null>(null);

export const DashboardContexProvider = ({ children }: React.PropsWithChildren) => {
	const [datasets, setDatasets] = useState<ScatterDataset[]>([]);

	const predict = (x: number, y: number) => {
		return modelPredict(x, y);
	};

	useEffect(() => {
		const fromJSON = async (file: string) => {
			return await fetch(file).then((data) => data.json()).catch((_) => [])
		}

		const loadData = async () => {
			let cluster1: ScatterDataset = {
				label: "Cluster 1",
				backgroundColor: "rgba(255, 99, 132, 1)",
				data: await fromJSON("/data/clusters_0.json")
			};

			let cluster2: ScatterDataset = {
				label: "Cluster 2",
				backgroundColor: "rgb(99, 120, 255)",
				data: await fromJSON("/data/clusters_1.json")
			};

			let cluster3: ScatterDataset = {
				label: "Cluster 3",
				backgroundColor: "rgb(128, 255, 99)",
				data: await fromJSON("/data/clusters_2.json")
			};

			let cluster4: ScatterDataset = {
				label: "Cluster 4",
				backgroundColor: "rgb(255, 148, 99)",
				data: await fromJSON("/data/clusters_3.json")
			};

			let cluster5: ScatterDataset = {
				label: "Cluster 5",
				backgroundColor: "rgb(99, 255, 224)",
				data: await fromJSON("/data/clusters_4.json")
			};

			setDatasets([cluster1, cluster2, cluster3, cluster4, cluster5]);
		};

		loadData();
	}, []);

	return <DashboardContex value={{ predict, datasets }}>{children}</DashboardContex>;
};
