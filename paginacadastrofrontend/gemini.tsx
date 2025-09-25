import { useState } from 'react';

const Gemini = () => {
  const [cliques, setCliques] = useState(0);
  return (
    <div>
      <p>Você clicou {cliques} vezes.</p>
      <button onClick={() => setCliques(cliques + 1)}>Clique aqui</button>
    </div>
  );
};

export default Gemini;
