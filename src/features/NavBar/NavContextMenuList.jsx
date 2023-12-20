export default function NavContextMenuList({
  refEl,
  contextMenuPosition,
  children,
}) {
  return (
    <div
      ref={refEl}
      className="navbar-context-menu"
      style={{
        top: `${contextMenuPosition.y}px`,
        right: `${contextMenuPosition.x}px`,
      }}
    >
      {children}
    </div>
  );
}
