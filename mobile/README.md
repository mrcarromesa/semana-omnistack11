<h1>Mobile</h1>

- Instalar o expo:

```bash
yarn add global expo-cli
```

- Criar novo projeto:

```bash
expo init mobile
```

- Escolher Template blank

- Aguardar instalação

- Executar no dispositivo: 

- Acessar a pasta do projeto e no terminal executar:

```bash
yarn start
```

- Irá executar o expo no browser e irá gerar um qr code.

- Baixar o app do expo no dispositivo

- E escanear o qrcode para abrir o a aplicação no dispositivo

---

- Alterar o nome da aplicação, no arquivo `app.json` onde há algumas configurações para aplicação altere o `name` e o `slug` que não pode ter caracteres especiais e nem espaços, também a cor de fundo `backgroundColor`

---

<h2>Estrutura Elementos visuais React Native</h2>

- No Ract Native não utiliza os componentes conforme na web com `div`, `span`, `p`, e assim por diante,

- Em geral no lugar da `div`, de uma `section`, de um `aside`, `header`, `footer` utiliza o `View`,

- Quando for para utilizar um paragrafo, um cabeçalho, um negrito, qualquer tipo de texto utilizamos o `Text`, não tem semantica, para diferenciar se é um `h1` ou `p` ou `label`, simplesmente utilizamos o `Text` para tudo que for texto.

- No React Native também não temos `id`, `class` que auxiliam na estilização.

- No React Native utilizamos estilização in-line utilizando a class `StyleSheet` 

- Todos os elementos do React Native já são display `flex` por padrão, não existe display `block`

- As propriedades dos estilos são um pouco diferente do da Web, não utiliza o hífen, `background-color` mas sim a primeira letra após o hífen é maiuscula `backgroundColor`, e os valores que não são números precisam estar em caixa alta.

- Não existe herança de estilo como na web, exemplo `<div><p>texto</p></div>` com o style `div { color: #fff; }`, no React Native não funciona, tenho que declarar separadamente o estilo de cada elemento.

---

<h2>Criação de página</h2>

- Basicamente a criação de páginas segue o mesmo conceito do ReactJS, estados, effect, muita coisa dá para reaproveitar.


---

<h2>Rotas</h2>

- Consultar na documentação do Expo:

[Routing & Navigation](https://docs.expo.io/versions/latest/guides/routing-and-navigation/) o qual depois nos leva a essa documentação:

[React Navigation](https://reactnavigation.org/docs/getting-started)

- Seguindo os passos da documentação realizamos a instalação:

```bash
yarn add @react-navigation/native
```

- Depois, como estamos executando o expo executamos esse comando:

```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

- Para esse projeto será utilizado o stack navigation, é uma navegação que não terá abas, ou menu, é só uma navegação por botões, dessa forma utilizamos conforme documentação:

[Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation)

- Vamos executar o seguinte comando:

```bash
yarn add @react-navigation/stack
```

- Por fim inserir o a navegação em `src/routes.js`

- Assim com no ReactJS temos o BrowserRouter, no React Native temos o NavigationContainer

- O componente `<AppStack.Screen name="Incidents" component={Incidents} />` recebe cada uma das páginas que forma criadas, assim como utilizamos o `Route` na web, é necessário sempre informar o name.

- Por padrão o `AppStack.Navigator` cria um title para cada página, para remover utilize a seguinte propriedade:

```js
<AppStack.Navigator screenOptions={{headerShown: false}}>
```

---

<h2>Para evitar que o conteúdo fique escondido na toolbar</h2>

- Instalar a o pacote:

```bash
expo install expo-constants
```

- Para utilizar import o pacote:

```js
import Constants from 'expo-constants';
```

- Para obter o tamanho da `status bar` utilize a constante: `Contants.statusBarHeight`

- Ao invés de utilizaar o Button que possuí um estilo padrão, podemos utilizar o TouchableOpacity que torna qualquer coisa clicavel.

---

<h2>O Expo já vem com os pacotes de icones</h2>

- Para utilizar importar:

```js
import { } from '@expo/vector-icons';
```

---

<h2>Scroll</h2>

- Para realizar o scroll de itens com React Native podemos utilizar o `FlatList`:

```js
import { FlatList } from 'react-native';
```

---

<h2>Links de navegação</h2>

- Para navegar entre telas podemos utilizar:

```js
import { useNavigation } from '@react-navigation/native';

function Component() {

    const navigation = useNavigation();

    function click() {
        navigation.navigate('NOME_DA_ROTA');
    }
}
```

---

<h2>Enviar E-mail utilizando component do expo</h2>

- Instalar o pacote:

```bash
expo install expo-mail-composer
```

- Documentação:

[MailComposer](https://docs.expo.io/versions/latest/sdk/mail-composer/)

- importando no arquivo:

```js
import * as MailComposer from 'expo-mail-composer';
```

- E a function ficará mais ou menos assim:

```js
function sendMail() {
    MailComposer.composeAsync({
        subject: 'Heroí do caso: Cadelinha atropelada',
        recipients: ['mrcarromesa@gmail.com'],
        body: message,
    })
}
```

- Para abrir o WhastsApp, ou qualquer outra aplicação utilizamos o recurso de Deep Linking

---
<h2>Formatar Curreny Android/IOS</h2>

No React Native o intl não funciona nativamente no android, por isso precisamos fazer o seguinte:

- Instalar o Intl:

```bash
yarn add intl
```

- Para utilizar no arquivo `App.js` importar o `intl` dessa forma ficará disponível para toda aplicação:

```js
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'; //Importar do portugues do brasil
```

- E usar normalmente a function `Intl`

---

<h2>Passar informações de uma página para outra</h2>

- Enviando a informação:

```js
navigation.navigate('Detail', { incident });
```

- Na outra página para receber precisamos importar o seguinte:

```js
import { useNavigation, useRoute } from '@react-navigation/native';
```

- dentro da function do componente adicionar:

```js
const route = useRoute();
```

- E para resgatar o parametro utilize o seguinte:

```js
const incident = route.params.incident;
```

- o `.incident` é devido na página que está enviando essa informação está passando o parametro com esse nome.


----

<h2>Scroll Infinito Paginação</h2>

- Adicionar mais alguns estados para controlar melhor isso:

```js
const [total, setTotal] = useState(0);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
```

- Na function que carrega os dados:

```js
async function loadIncidents() {
    if (loading) {
        return;
    }

    if (total > 0 && incidents.length === total) {
        return;
    }

    setLoading(true);
    
    const response = await api.get('incidents', {
        params: { page }
    });
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
}
```

- No componete `FlatList` adicionar mais duas propriedades:

```js
<FlatList 
    ...
    onEndReached={loadIncidents}
    onEndReachedThreshold={0.2}
    ...
/>
```