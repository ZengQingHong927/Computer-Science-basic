# WizardContext

<https://github.com/streamich/react-use>
<https://github.com/brianyang/react-hooks-multi-step-wizard>
<https://github.com/rahsheen/react-wizard>
<https://github.com/Jibbedi/react-wizard-primitive>
<https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c>

## WizardCtxProvider
gotoStep
gotoNext
gotoPrev
activeStepIdx
WizardStep
```js

funciton WizardStep (props) {
        let     {
                stepidx,
                component:      Component,
                ...rest
        }       = props;

        let     { activeStepIdx }       = useContext(WizardContext);

        return (activeStepIdx === stepidx) ? <Component {...rest}> : null;
}


```