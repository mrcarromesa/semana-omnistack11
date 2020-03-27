<h1>Projeto com React</h1>

- Remover alguns arquivos que não iremos utilizar:

- [Projeto com ReactJS Parte 1 (Inicio)](https://github.com/mrcarromesa/react-parte1)

- Exemplo de como repassar itens dentro de um componente via propriedades para outro componente:

```js
//App.js
import React from 'react';

import Header from './components/Header';

function App() {
// Queremos enviar o Semana Omnistack para o component Header.
  return <Header>Semana Omnistack</Header>;
}

export default App;
```

```js
import React from 'react';
import PropTypes from 'prop-types';

function Header({ children }) {
  return (
    <header>
      {/*Recebe a propriedade do component aqui*/}
      <h1>{children}</h1>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Header;

```
---
<h2>Melhorar produtividade no vscode</h2>

- Para transformar isso: `div.minhaclass>p` nisso:

```js
<div className="minhaclass"><p></p></div>
```

- Abra as configurações em JSON do VS Code e adicione/altere o seguinte:

```json
"emmet.syntaxProfiles": {
    "javascript": "jsx",
},

"emmet.includeLanguages": {
    "javascript": "javascriptreact",
},
```

---

<h2>Icons</h2>

- Utilizar um pacote de icons completo, instalar:

```bash
yarn add react-icons
```

- Nesse projeto foi utilizado o pacote [Feather Icons](https://feathericons.com)


---

<h2>Rotas</h2>

- Instalar o pacote de rotas:

```bash
yarn add react-router-dom
```

---

<h2>Acessar API</h2>

- Instalar o axios:

```bash
yarn add axios
```

- Criar o arquivo `src/services/api.js` com o seguinte conteúdo:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

```

- Depois importar nos outros arquivos que fará chamada de api.
