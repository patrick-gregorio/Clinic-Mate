import { auth } from "../../firebase-config";
function Home() {
  function logOut() {
    auth.signOut();
  }
  return (
    <>
      <h1>HomeTest</h1>
      <button onClick={logOut}>logout</button>
    </>
  );
}
export default Home;
