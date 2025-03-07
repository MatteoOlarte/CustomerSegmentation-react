import { ComponentProps } from "react";
import styles from "./styles.css";

interface InputFieldProps extends ComponentProps<"input"> {
	label: string;
}

function InputField({ id, label, ...props }: InputFieldProps) {
	return (
		<div className="mb-3">
			<label htmlFor={id} className="form-label">{label}</label>
			<input id={id} className="form-control" {...props} />
		</div>
	);
}

export default InputField;
