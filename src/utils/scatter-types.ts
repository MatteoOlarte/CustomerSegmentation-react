export type ScatterPoint = {
  x: number;
  y: number;
};

export type ScatterDataset = {
  label: string;
  data: ScatterPoint[];
  backgroundColor: string;
};