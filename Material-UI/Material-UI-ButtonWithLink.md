# Button with Link

<https://stackoverflow.com/questions/51642532/how-to-make-a-material-ui-react-button-act-as-a-react-router-dom-link>

## example

```js
import { Link as RouterLink } from 'react-router-dom';

<Tooltip title='Menu'>
        <IconButton color="inherit" onClick={onSidebarOpen} component={RouterLink} to='/#account/_id'>
                <MenuIcon />
        </IconButton>
</Tooltip>
```