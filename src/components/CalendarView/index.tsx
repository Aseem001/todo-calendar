import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Appointment } from "../../types";
import EventForm from "../EventForm/";
import { Calendar } from "../Calendar";

export default function CalendarView() {
  const [appointment, setAppointment] = useState<Appointment>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);

  return (
    <Flex gap={10} m={4} height="100%">
      <Flex grow={1} flexBasis={"50%"} overflow="auto">
        <Calendar
          onShowAppointmentView={(appointment: any) => {
            setAppointment(appointment);
            setIsModalOpen(true);
          }}
          data={allAppointments}
          setData={setAllAppointments}
        />
      </Flex>
      {appointment && isModalOpen && (
        <EventForm
          appointment={appointment}
          setIsModalOpen={setIsModalOpen}
          allAppointments={allAppointments}
          setAllAppointments={setAllAppointments}
        />
      )}
    </Flex>
  );
}
