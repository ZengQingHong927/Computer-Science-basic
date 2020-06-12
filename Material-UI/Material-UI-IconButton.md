# IconButton

<https://material-ui.com/components/buttons/>

## Sample

```js

import { Link } from 'react-router-dom'

// <ModIconButton tooltip="进入" icon="keyboard_arrow_right" component={Link} to={`/pathname`} />

import      Tooltip                                     from '@material-ui/core/Tooltip';

import      IconButton                                  from '@material-ui/core/IconButton';
import      Icon                                        from '@material-ui/core/Icon';

function IconButtonWithRef (props, ref) {

        let   { className,
                tooltip,
                icon,
                iconComponent:  IconComponent,
                iconProps,
                ...rest }       = props;
        if (tooltip) {
                return (
                        <Tooltip title={title}>
                                <IconButton className={clsx (classes.root, className)} aria-label={icon} ref={ref} {...rest}  >
                                {IconComponent ?
                                <IconComponent {...iconProps}/> :
                                <Icon>{icon}</Icon> }
                        </IconButton>
                        </Tooltip>
                )
        }


        return (
                <IconButton className={clsx (classes.root, className)} aria-label={icon} ref={ref} {...rest}  >
                        {IconComponent ?
                        <IconComponent {...iconProps}/> :
                        <Icon>{icon}</Icon> }
                </IconButton>
        )
}


React.forwardRef (ModIconButtonWithRef);

```