# router config
https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

import { useLocation } from 'react-router-dom;
import { useParams } from 'react-router-dom;
import { renderRoutes } from 'react-router-config'
import { LinearProgress } from '@material-ui/core/LinearProgress

```js
let location = useLocation ()
let { tab, id } = useParams ()
```

```js
const routeConfig = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/child/:id",
        component: Child,
        routes: [
          {
            path: "/child/:id/grand-child",
            component: GrandChild
          }
        ]
      }
    ]
  }
];

<main>
        <Suspense fallback={<LineaProgress />}>
                { renderRoutes (routeConfig.routes) }
        </Suspense>
</main>
```