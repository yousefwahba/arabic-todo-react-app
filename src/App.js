// import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import TodoList from "./views/TodoList";
import "./assets/style.css";
function App() {
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
