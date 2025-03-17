import Layout from "./Layout/Layout";
import Navigator from "./components/Navigator";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <Layout>
      <div className="mx-auto mt-10 pb-5">
        <Navigator />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <TaskList />
      </div>
    </Layout>
  );
};

export default App;
