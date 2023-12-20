export default function NavContextMenuItem({ handleClick, children }) {
  return (
    <div className="navbar-context-item" onClick={() => handleClick()}>
      {children}
    </div>
  );
}
