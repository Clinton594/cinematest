export const Row = ({ children }) => {
  return <div className="row">{children}</div>;
};

export const Col = ({ sm, md, lg, children, className }) => {
  const colSm = (sm && `col-sm-${sm}`) || "";
  const colMd = (md && `col-md-${md}`) || "";
  const colLg = (lg && `col-lg-${lg}`) || "";
  className = className || "";
  return <div className={`${colSm} ${colMd} ${colLg} ${className}`}>{children}</div>;
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
export const Aside = ({ children, className }) => {
  return <aside className={className && className}>{children}</aside>;
};
export const Ul = ({ children, className }) => {
  return <ul className={className && className}>{children}</ul>;
};
export const Li = ({ children, className }) => {
  return <li className={className && className}>{children}</li>;
};

export const Content = ({ children, className }) => {
  return <div className={`${className} content`}>{children}</div>;
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
