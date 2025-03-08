import React, { useState, useContext, useRef } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { DashboardContex, IDashboardContexType } from "../../context/DashboardContex";
import InputField from "../../components/InputField";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function DashboardPage(): React.JSX.Element {
	const context = useContext(DashboardContex);
	const [value, setValue] = useState<number | undefined>();
	const value1Ref = useRef<HTMLInputElement>(null);
	const value2Ref = useRef<HTMLInputElement>(null);

	// Definir las descripciones de los clusters*
	const handleChange = (_: React.ChangeEvent<HTMLInputElement>) => {
		if (!context) return;

		// Obtener los valores actuales de las refs
		const value1 = Number(value1Ref.current?.value);
		const value2 = Number(value2Ref.current?.value);

		if (!isNaN(value1) && !isNaN(value2)) {
			const predicted: number = context.predict(value1, value2);
			setValue(predicted);
		}
	};

	return (
		<div className="m-5">
			<form className="p-4 border rounded bg-black mb-4">
				<div className="row g-4">
					<div className="col-lg-6">
						<h4 className="mb-4">Segmentación de Clientes</h4>

						<InputField
							label="Ingresos Anuales (Miles USD)"
							id="input-1"
							type="text"
							placeholder="Ingrese el primer valor"
							ref={value1Ref}
							onChange={handleChange}
						/>

						<InputField
							label="Puntaje de Gasto"
							id="input-2"
							type="text"
							placeholder="Ingrese el segundo valor"
							ref={value2Ref}
							onChange={handleChange}
						/>

						<button type="submit" className="btn btn-primary d-none">
							Calcular
						</button>
					</div>

					<div className="col-lg-6">
						<h4 className="mb-4">Resultados</h4>

						{(value && (
							<div>
								<div className="mb-3">
									<p className="mb-1">
										<b>Ingesos Anuales: </b>
										{`$${value1Ref.current?.value} miles de USD`}
									</p>
									<p className="mb-1">
										<b>Puntaje de Gasto: </b>
										{value2Ref.current?.value}
									</p>
									<p className="mb-1">
										<b>Grupo Asignado: </b>
										{value + 1}
									</p>
								</div>

								<p>
									<b>¿Que significa el grupo asignado a un cliente?</b>
								</p>
								<ol className="list-group list-group-numbered">
									<li className="list-group-item">Clientes con bajos ingresos y bajo puntaje de gasto.</li>
									<li className="list-group-item">Clientes con ingresos medios y puntaje de gasto promedio.</li>
									<li className="list-group-item">Clientes con altos ingresos y bajo puntaje de gasto.</li>
									<li className="list-group-item">Clientes con ingresos bajos y alto puntaje de gasto.</li>
									<li className="list-group-item">Clientes con altos ingresos y alto puntaje de gasto.</li>
								</ol>
							</div>
						)) || <p>Porfavor ingrese los datos para realizar el calculo del cliente</p>}
					</div>
				</div>
			</form>

			{context && (
				<div className="p-4 border rounded bg-black mb-4">
					<h4>Grafico de Distribución</h4>
					<ScatterChart context={ context } />
				</div>
			)}
		</div>
	);
}

function ScatterChart({ context }: { context: IDashboardContexType }) {
	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
			x: {
				beginAtZero: true,
			},
		},
	};

	return <Scatter data={{ datasets: context.datasets }} options={options} />;
}
export default DashboardPage;
