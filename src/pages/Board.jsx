import BoardAside from "../features/Boards/BoardAside";
import BoardTasks from "../features/Boards/BoardTasks";

export default function Board() {
  return (
    <section className="section-board">
      <BoardAside />
      <BoardTasks />
    </section>
  );
}
