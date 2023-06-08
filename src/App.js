import React, {useState} from 'react';

import Graph3D from './Components/Graph3D/Graph3D';

function App() {
  const [show, setShow] = useState(false)
  return (
    <section>
      <h1 onClick = {() => setShow(!show)}>показать</h1>

      {show && <Graph3D/>}
    </section>
  );
}

export default App;
