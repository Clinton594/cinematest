import Spinner from "./Spinner";

export default function Fieldset({ title, children, value, isLoading }) {
  return (
    <fieldset>
      <legend>
        {title} : {isLoading ? <Spinner size="sm" animation="grow" variant="primary" /> : <strong>{value}</strong>}
      </legend>
      <div>{children}</div>
    </fieldset>
  );
}

export const Row = ({ children }) => {
  return <div className="row">{children}</div>;
};

export const Col = ({ sm, md, lg, children }) => {
  const val = sm || md || lg;
  const cls = sm !== undefined ? "sm" : md !== undefined ? "md" : "lg";
  return <div className={`col-${cls}-${val}`}>{children}</div>;
};

export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export const Form = ({ children, onSubmit, className }) => {
  return (
    <form onSubmit={onSubmit} className={`${className} p-4`}>
      {children}
    </form>
  );
};

export const FormElement = ({
  className,
  name,
  type,
  placeholder,
  disabled,
  value,
  checked,
  label,
  onChange,
  required,
  min,
  step,
}) => {
  return (
    <div className={`form-group ${className || ""}`}>
      <label htmlFor={name}>{label}</label>
      <div className={type}>
        <input
          type={type === undefined ? "input" : type === "switch" ? "checkbox" : type}
          className="form-control px-4"
          step={step}
          min={min}
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          defaultValue={value || ""}
          placeholder={placeholder === undefined ? "" : placeholder}
          disabled={disabled === undefined ? false : disabled}
        />
        {type === "switch" && (
          <div>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export const Button = ({ children, disabled, variant, type, onClick, className }) => {
  className = typeof className === "undefined" ? "mb-3" : className;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`justify-content-center btn btn-${variant} d-flex ${className}`}
      disabled={disabled === undefined ? false : disabled}
    >
      {children}
    </button>
  );
};
