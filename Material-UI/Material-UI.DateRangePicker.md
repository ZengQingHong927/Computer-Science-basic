# React-date-picker

```js

import React, { useEffect, useRef, useState } from 'react'
import DayPicker, { DateUtils, Modifier } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import makeStyles from '@material-ui/core/styles/makeStyles'
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import dayjs from 'dayjs'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import { selectDeviceView } from 'features/devices/deviceViewSlice'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation'
import IconButton from '@material-ui/core/IconButton'
import { parseDateString } from 'utils/dateTimeFormat'
import { AllxonButton } from 'components/AllxonButton'
import clsx from 'clsx'

type MsgInfosType = {
  msgIcon: boolean
  msgContent: string
  type: string
  newAccount: boolean
  msgHeaderIcon: boolean
  msgHeaderContent: string
}

type ModifiersTypes = {
  start: Date
  end: Date
}

interface ActivitiesDateRangePickerV2Props {
  handleDateChange: (dates: Date[]) => void
  selectedDate: any[]
  getDeviceActivityData: (dates: any) => void
  toggleVisibleDateDialog: (visible: boolean) => void
  setMsgInfos: (msg: MsgInfosType) => void
}

// TODO: Refine date change hooks, getDeviceActivityData maybe not be passed
function ActivitiesDateRangePickerV2(props: ActivitiesDateRangePickerV2Props) {
  const { handleDateChange, selectedDate, getDeviceActivityData, toggleVisibleDateDialog, setMsgInfos } = props

  // const [visibleDataPicker, toggleVisibleDatePicker] = useState(false);
  const [fromSelected, setFromSelected] = useState<Date>()
  const [toSelected, setToSelected] = useState<Date>()
  const [modifiers, setModifiers] = useState<ModifiersTypes | undefined>(undefined)
  const [fromDisplay, setFromDisplay] = useState('')
  const [toDisplay, setToDisplay] = useState('')
  const [initMonthDisplay, setInitMonthDisplay] = useState(getInitialMonth)
  const classes = useStyles()
  const { t } = useTranslation()

  const { insert_time } = useSelector(selectDeviceView)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (selectedDate !== undefined && selectedDate !== null) {
      initDatePicker()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])

  function initDatePicker() {
    const fromDate = selectedDate[0]
    const toDate = selectedDate[1]

    const initMonthOvr = dayjs(fromDate).toDate() // * https://github.com/gpbl/react-day-picker/issues/803
    const fromDisplayOvr = dayjs(fromDate).format('YYYY MMM DD')
    const toDisplayOvr = dayjs(toDate).format('YYYY MMM DD')

    setFromDisplay(fromDisplayOvr)
    setToDisplay(toDisplayOvr)
    setInitMonthDisplay(initMonthOvr)

    setFromSelected(new Date(fromDate))
    setToSelected(new Date(toDate))
    setModifiers({ start: new Date(fromDate), end: new Date(toDate) })
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function getInitialMonth() {
    return new Date()
  }

  // TODO: clear date calculation code, move it into another file
  function handleDayClick(date: any) {
    // console.log (`handleDayClick::date::${JSON.stringify (date, null, 4)}`)
    const MAX_QUERY_SEC = 90 * 24 * 60 * 60
    const maxDate = dayjs().endOf('day').toDate()
    const minDate = parseDateString(insert_time, 'YYYY-MM-DD HH:mm:ss').startOf('day').toDate()

    if (fromSelected === undefined || toSelected === undefined) return

    // * disable enroll date and feature date
    if (date > maxDate) return

    if (date < minDate) {
      setMsgInfos({
        msgIcon: false,
        msgContent: t('S_07000'),
        type: 'warning',
        newAccount: false,
        msgHeaderIcon: true,
        msgHeaderContent: 'Warning',
      })
      toggleVisibleDateDialog(true)
      return
    }

    const range = DateUtils.addDayToRange(date, { from: fromSelected, to: toSelected })
    // console.log (`handleDayClick::range::${JSON.stringify (range, null, 4)}`)

    const { from, to } = range

    if (from === null || to === null) return

    // * 判斷日期範圍至多90days
    const from_ovr = dayjs(from)
    const to_ovr = dayjs(to)
    const queryrangetime = to_ovr.diff(from_ovr, 's', true)

    if (queryrangetime >= MAX_QUERY_SEC) {
      // console.log (`handleDateChange::exceed::${queryrangetime}`)

      setMsgInfos({
        msgIcon: false,
        msgContent: t('S_06999'),
        type: 'warning',
        newAccount: false,
        msgHeaderIcon: true,
        msgHeaderContent: 'Warning',
      })
      toggleVisibleDateDialog(true)
      return
    }

    const initMonthOvr = dayjs(from).toDate()
    const fromDisplayOvr = from_ovr.format('YYYY MMM DD')
    const toDisplayOvr = to_ovr.format('YYYY MMM DD')

    setFromDisplay(fromDisplayOvr)
    setToDisplay(toDisplayOvr)
    setInitMonthDisplay(initMonthOvr)

    setFromSelected(from)
    setToSelected(to)
    setModifiers({ start: from, end: to })

    // * For Debug
    // console.log (`handleDateChange::${JSON.stringify (from, null, 4)}`)
    // console.log (`handleDateChange::${JSON.stringify (to, null, 4)}`)

    handleDateChange([from, to])
    getDeviceActivityData([from, to])
  }

  // TODO: clear date calculation code, move it into another file
  function switchDateRage(e: any) {
    const switchOpt = e.target.dataset.opt
    const minDate = parseDateString(insert_time, 'YYYY-MM-DD HH:mm:ss').startOf('day')
    if (!switchOpt) return

    const nowTime = dayjs()
    let dateRange = [] as any

    switch (switchOpt) {
      case '7Days': {
        const startDate = nowTime.subtract(7, 'day').startOf('day')
        const startTime = startDate.isBefore(minDate) ? minDate : startDate
        dateRange = [startTime, nowTime]
        break
      }
      case '30Days': {
        const startDate = nowTime.subtract(30, 'day').startOf('day')
        const startTime = startDate.isBefore(minDate) ? minDate : startDate

        dateRange = [startTime, nowTime]
        break
      }
      case 'This Month': {
        const startDate = nowTime.startOf('month')
        const startTime = startDate.isBefore(minDate) ? minDate : startDate

        dateRange = [startTime, nowTime]
        break
      }
      case 'Last Month': {
        const startDate = nowTime.subtract(1, 'month').startOf('month')
        const startTime = startDate.isBefore(minDate) ? minDate : startDate
        const endTime = nowTime.subtract(1, 'month').endOf('month')
        dateRange = [startTime, endTime]

        if (endTime.isBefore(minDate)) {
          setMsgInfos({
            msgIcon: false,
            msgContent: t('S_07000'),
            type: 'warning',
            newAccount: false,
            msgHeaderIcon: true,
            msgHeaderContent: 'Warning',
          })
          toggleVisibleDateDialog(true)
          return
        }

        break
      }
      default:
        break
    }

    // console.log (dateRange[0].format())

    const startTime = new Date(dateRange[0].format())
    const endTime = new Date(dateRange[1].format())

    const initMonthOvr = dayjs(startTime).toDate()
    const fromDisplayOvr = dayjs(startTime).format('YYYY MMM DD')
    const toDisplayOvr = dayjs(endTime).format('YYYY MMM DD')

    setInitMonthDisplay(initMonthOvr)
    setFromDisplay(fromDisplayOvr)
    setToDisplay(toDisplayOvr)
    setFromSelected(startTime)
    setToSelected(endTime)
    setModifiers({ start: startTime, end: endTime })

    // * For Debug
    // console.log (`switchDateRage::${JSON.stringify (startTime, null, 4)}`)
    // console.log (`switchDateRage::${JSON.stringify (endTime, null, 4)}`)

    handleDateChange([startTime, endTime])
    getDeviceActivityData([startTime, endTime])
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Grid container style={{ margin: '0px' }}>
        <Grid item style={{ display: 'flex' }}>
          <DateRangeInput fromDisplay={fromDisplay} toDisplay={toDisplay} handleClick={handleClick} />
        </Grid>
        <Popover
          className={classes.popover}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <RangeDatePicker
            fromSelected={fromSelected}
            toSelected={toSelected}
            switchDateRage={switchDateRage}
            handleDayClick={handleDayClick}
            modifiers={modifiers}
            initMonthDisplay={initMonthDisplay}
            insert_time={insert_time}
            closePicker={handleClose}
          />
        </Popover>
      </Grid>
    </>
  )
}

function DateRangeInput(props: any) {
  const classes = useStyles()
  const { fromDisplay, toDisplay, handleClick } = props

  return (
    <>
      <Box className={classes.dateRangePickerInput}>
        <TextField
          style={{ width: '100px' }}
          variant="standard"
          value={fromDisplay}
          onClick={handleClick}
          InputProps={{
            style: { paddingRight: '0px', color: '#1065e0' },
            disableUnderline: true,
          }}
        />
        <Box style={{ paddingTop: '6px', paddingRight: '8px', color: '#1065e0' }}>-</Box>
        <TextField
          style={{ width: '140px' }}
          variant="standard"
          value={toDisplay}
          onClick={handleClick}
          InputProps={{
            style: { paddingRight: '0px', color: '#1065e0' },
            disableUnderline: true,
            endAdornment: (
              <IconButton type="submit" aria-label="clear" size="small">
                <InsertInvitationIcon color="primary" fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </Box>
    </>
  )
}
interface DateRangePickerV2Props {
  fromSelected: Date | undefined
  toSelected: Date | undefined
  switchDateRage: (e: any) => void
  handleDayClick: (date: any, rest: any) => void
  modifiers: ModifiersTypes | undefined
  initMonthDisplay: Date
  insert_time: string
  closePicker: () => void
}

function RangeDatePicker(props: DateRangePickerV2Props) {
  const {
    fromSelected,
    toSelected,
    switchDateRage,
    handleDayClick,
    modifiers,
    initMonthDisplay,
    insert_time,
    closePicker,
  } = props
  const [selectedDays, setSelectedDays] = useState<Modifier>()
  const classes = useStyles()
  const { t } = useTranslation()
  const ref = useRef<DayPicker>(null)
  useEffect(() => {
    if (fromSelected !== undefined && toSelected !== undefined) {
      setSelectedDays({ from: fromSelected, to: toSelected })
      if (ref !== null) {
        ref.current?.showMonth(fromSelected)
      }
    }
  }, [fromSelected, toSelected])

  function disabledDays() {
    // console.log (day)
    const minDate = dayjs(insert_time).toDate()
    return [{ after: new Date(), before: minDate }]
  }

  return (
    <>
      <Grid container direction="column" style={{ height: '100%' }}>
        <Grid item>
          <DayPicker
            className={classes.datePicker}
            numberOfMonths={2}
            selectedDays={selectedDays}
            onDayClick={handleDayClick}
            modifiers={modifiers}
            initialMonth={initMonthDisplay}
            disabledDays={disabledDays()}
            ref={ref}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            onClick={switchDateRage}
            style={{ margin: '0px', height: '100%', backgroundColor: '#ebf3fb', width: '100%' }}
          >
            <Grid item classes={{ root: classes.dateFilterRoot }}>
              <Typography component="span" className={classes.dateFilterBtn} data-opt="7Days">
                {t('S_04548')}
              </Typography>
            </Grid>
            <Grid item classes={{ root: classes.dateFilterRoot }}>
              <Typography component="span" className={classes.dateFilterBtn} data-opt="30Days">
                {t('S_04549')}
              </Typography>
            </Grid>
            <Grid item classes={{ root: classes.dateFilterRoot }}>
              <Typography component="span" className={classes.dateFilterBtn} data-opt="This Month">
                {t('S_03179')}
              </Typography>
            </Grid>
            <Grid item classes={{ root: classes.dateFilterRoot }}>
              <Typography component="span" className={classes.dateFilterBtn} data-opt="Last Month">
                {t('S_04551')}
              </Typography>
            </Grid>
            <Grid item classes={{ root: clsx(classes.dateFilterRoot, classes.lastDateFilterRoot) }}>
              <AllxonButton classes={{ root: classes.buttonRoot }} variant="text" color="primary" onClick={closePicker}>
                {t('S_05667')}
              </AllxonButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const useStyles = makeStyles({
  datePicker: {
    '& .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside)': {
      backgroundColor: '#f0f8ff !important',
      color: '#4a90e2',
    },
    '& .DayPicker-Day': {
      borderRadius: '0 !important',
    },
    '& .DayPicker-Day--start': {
      borderTopLeftRadius: '50% !important',
      borderBottomLeftRadius: '50% !important',
    },
    '& .DayPicker-Day--end': {
      borderTopRightRadius: '50% !important',
      borderBottomRightRadius: '50% !important',
    },
    '& .DayPicker-wrapper': {
      paddingBottom: '0px',
    },
    '& .DayPicker-Caption': {
      color: '#0061e3',
    },
  },
  dateFilterRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  lastDateFilterRoot: {
    marginLeft: 'auto',
  },
  dateFilterBtn: {
    color: '#40566e',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  popover: {
    // padding: '16px',
    width: '100%',
    zIndex: 1100,
    '& .MuiPopover-paper': {
      // height: '100%',
      maxHeight: 'calc(100% - 0px)',
    },
  },
  dateRangePickerInput: {
    border: '1px #1065e0 solid',
    width: '100%',
    display: 'flex',
    padding: '0px 24px',
    borderRadius: '25px',
  },
  buttonRoot: {
    height: 'auto',
    minWidth: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '5px',
    paddingTop: '5px',
  },
})

export default ActivitiesDateRangePickerV2


```