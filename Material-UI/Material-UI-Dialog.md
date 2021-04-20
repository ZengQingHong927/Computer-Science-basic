# Dialog

```js
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'
import React from 'react'

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      backgroundImage: 'linear-gradient(to left, #009feb 0%, #0061e3 100%)',
      textAlign: 'center',
      height: '47px',
    },
    title: {
      color: 'white',
      fontSize: '17px',
      lineHeight: '47px',
      height: '100%',
    },
    closeButton: {
      position: 'absolute',
      right: '0px',
      top: '0px',
    },
    closeIcon: {
      color: 'white',
      width: '19.2px',
      height: '19.2px',
    },
  })

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose?: () => void
}

export const AllxonDialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.title}>{children}</div>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

export const AllxonDialogContent = withStyles(() => ({
  root: {
    padding: 0,
    fontSize: '24px',
  },
}))(MuiDialogContent)

export const AllxonDialogActions = withStyles(() => ({
  root: {
    // marginBottom: '17px',
    padding: '17px 20px',
  },
}))(MuiDialogActions)

const useStyles = makeStyles({
  paperWidthSm: {
    maxWidth: '876px',
    // minWidth: '646px',
    minWidth: '510px',
  },
  paper: {
    borderRadius: '8px',
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export interface StepperDialogProps {
  title: React.ReactNode
  content?: React.ReactNode
  action?: React.ReactNode
  showCloseButton?: boolean
  onClose: () => void
}

function AllxonDialog({
  open,
  title,
  content,
  action,
  showCloseButton,
  onClose,
  classes,
  ...others
}: StepperDialogProps & Omit<DialogProps, keyof StepperDialogProps>) {
  const defaultClasses = useStyles()

  return (
    <Dialog
      classes={{
        ...classes,
        paper: clsx(defaultClasses.paper, classes?.paper),
        paperWidthSm: clsx(defaultClasses.paperWidthSm, classes?.paperWidthSm),
      }}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      {...others}
    >
      <AllxonDialogTitle id="customized-dialog-title" onClose={showCloseButton === false ? undefined : onClose}>
        {title}
      </AllxonDialogTitle>
      <AllxonDialogContent>{content}</AllxonDialogContent>
      {action !== undefined && <AllxonDialogActions>{action}</AllxonDialogActions>}
    </Dialog>
  )
}

export default AllxonDialog

```