import "./PageHeader.css";

export default function PageHeader({ label, title, description }) {
  return (
    <div className="page-header">
      <div className="page-header__inner container">
        {label && <span className="page-header__label">{label}</span>}
        <h1 className="page-header__title">{title}</h1>
        {description && (
          <div className="page-header__desc">
            {Array.isArray(description) ? (
              description.map((text, index) => <p key={index}>{text}</p>)
            ) : (
              <p>{description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
