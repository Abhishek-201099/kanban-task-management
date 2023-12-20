export default function NavMenu({ children, handleContextMenuToggle }) {
  return (
    <>
      <button
        className="btn-context-menu"
        onClick={(e) => handleContextMenuToggle(e)}
      >
        <img src="/icon-vertical-ellipsis.svg" alt="context-menu icon" />
      </button>
      {children}
    </>
  );
}
