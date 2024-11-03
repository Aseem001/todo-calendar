import { Box, Flex, Text } from "@chakra-ui/react";
import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "../../constants";
import { Appointment } from "../../types";

interface AppointmentEventProps {
  appointment: Appointment;
  onDoubleClick: (appointment: Appointment) => void;
}

export default function AppointmentEvent({
  appointment,
  onDoubleClick,
}: AppointmentEventProps) {
  const { location, status, agenda } = appointment;
  const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];

  return (
    <Box
      bg={background}
      p={1}
      height="100%"
      color="black"
      onDoubleClick={() => onDoubleClick(appointment)}
    >
      <Flex alignItems={"center"} justifyContent="space-between">
        <Flex>
          <Text fontSize="xs" fontWeight={"bold"}>
            {location}
          </Text>
        </Flex>
      </Flex>
      <Box mt={4}>
        {agenda?.split("\n").map((add: string) => (
          <Text fontSize="x-small" fontStyle={"italic"}>
            {add}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
