import {
  Calendar as BigCalendar,
  momentLocalizer,
  stringOrDate,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import AppointmentEvent from "./AppointmentEvent";
import { Appointment, EventItem } from "../../types";
import { useCallback } from "react";

const localizer = momentLocalizer(moment);

const initProps = {
  localizer: localizer,
  defaultView: Views.WEEK,
  views: [Views.MONTH, Views.WEEK, Views.DAY],
};

const DndCalendar = withDragAndDrop<EventItem>(BigCalendar);
interface CalendarProps {
  onShowAppointmentView: (appointment: any) => void;
  data: Appointment[];
  setData: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export const Calendar = ({
  onShowAppointmentView,
  data,
  setData,
}: CalendarProps) => {
  const components = {
    event: ({ event }: { event: any }) => {
      const data = event?.data;
      if (data?.appointment)
        return (
          <AppointmentEvent
            appointment={data?.appointment}
            onDoubleClick={() => {}}
          />
        );

      return null;
    },
  };

  const appointments = data?.map((appointment: Appointment) => ({
    start: new Date(appointment.start),
    end: new Date(appointment.end),
    data: { appointment },
    isDraggable: true,
  }));

  const onChangeEventTime = useCallback(
    (
      start: stringOrDate,
      end: stringOrDate,
      appointmentId: number | undefined
    ) => {
      console.log(start, end, appointmentId);
      setData((prevEvents: Appointment[]) => {
        const abc = prevEvents.map((event) => {
          return event?.id === appointmentId
            ? {
                ...event,
                start: moment(start).format(),
                end: moment(end).format(),
              }
            : event;
        });
        return abc;
      });
    },
    []
  );

  return (
    <DndCalendar
      onSelectSlot={({ start, end }) => {
        onShowAppointmentView({ start, end });
      }}
      onDoubleClickEvent={(event) => {
        const appointment = event?.data?.appointment;
        appointment && onShowAppointmentView(appointment);
      }}
      events={appointments}
      style={{ width: "100%" }}
      components={components}
      selectable
      resizable
      {...initProps}
      onEventDrop={({ start, end, event }) => {
        onChangeEventTime(start, end, event?.data?.appointment?.id);
      }}
    />
  );
};
