import Welcome from "../components/welcome/Welcome";
import HomePlanner from "../components/home/planner/HomePlanner";

function Home() {
  return (
    <>
      {/* Welcome section */}
      <div>
        <Welcome />
      </div>

      {/* HomePlanner section inside a Bootstrap container */}
      <div className="container mt-4">
        <HomePlanner description="Create plans for your domain and problem using Pianista." />
      </div>
    </>
  );
}

export default Home;
