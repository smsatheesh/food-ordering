export default function Button({
  textOnly,
  children,
  className = "",
  type = "button",
  ...props
}) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button type={type} className={cssClasses} {...props}>
      {children}
    </button>
  );
}
