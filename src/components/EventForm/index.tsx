import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useMemo } from "react";
import { Appointment } from "../../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";

interface EventFormProps {
  appointment: Appointment;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allAppointments: Appointment[];
  setAllAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

const CustomTimeInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (val: string) => void;
}) => (
  <Input
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
    width="100%"
  />
);

export default function EventForm({
  appointment,
  setIsModalOpen,
  allAppointments,
  setAllAppointments,
}: EventFormProps) {
  const label = appointment?.id ? "Update" : "Create";

  const initialValues = useMemo(
    () => ({ ...appointment, status: "P" }),
    [appointment]
  );

  const createAppointment = (values: any) => {
    setAllAppointments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: values.status,
        location: values.location,
        agenda: values.agenda,
        start: moment(values.start).format(),
        end: moment(values.end).format(),
      },
    ]);
    setIsModalOpen(false);
  };

  const updateAppointment = (values: any) => {
    const appointments = allAppointments.map((app) =>
      app.id === values.id
        ? {
            id: values.id,
            status: values.status,
            location: values.location,
            agenda: values.agenda,
            start: moment(values.start).format(),
            end: moment(values.end).format(),
          }
        : app
    );
    setAllAppointments(appointments);
    setIsModalOpen(false);
  };

  const deleteAppointment = (id: number) => {
    const appointments = allAppointments.filter((app) => app.id !== Number(id));
    setAllAppointments(appointments);
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={true} onClose={() => setIsModalOpen(false)} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{label} an appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            rounded="xl"
            bg="white"
            width="100%"
            style={{ padding: "0 20px 20px 20px" }}
          >
            <Formik
              onSubmit={async (values) => {
                if (!appointment.id) createAppointment(values);
                else updateAppointment(values);
              }}
              initialValues={initialValues}
              enableReinitialize
            >
              {({ values, setFieldValue, handleSubmit }: any) => {
                return (
                  <Form>
                    <Field name="location">
                      {({ field }: any) => (
                        <FormControl>
                          <FormLabel>Location</FormLabel>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="agenda">
                      {({ field }: any) => (
                        <FormControl>
                          <FormLabel>Agenda</FormLabel>
                          <Textarea
                            {...field}
                            rows={3}
                            value={field.value || ""}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="status">
                      {({ field }: any) => (
                        <FormControl>
                          <FormLabel>Status</FormLabel>
                          <Select {...field}>
                            <option value="CI">Checked In</option>
                            <option value="P">Pending</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Flex gap={4} mt={4}>
                      <Flex flexBasis={"50%"}>
                        <FormControl>
                          <FormLabel>Start Time</FormLabel>
                          <DatePicker
                            onChange={(date) => {
                              console.log({ date });
                              setFieldValue("start", date);
                            }}
                            selected={new Date(values.start)}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            customInput={<CustomTimeInput />}
                          />
                        </FormControl>
                      </Flex>
                      <Flex flexBasis={"50%"}>
                        <FormControl>
                          <FormLabel>End Time</FormLabel>
                          <DatePicker
                            onChange={(date) => setFieldValue("end", date)}
                            selected={new Date(values.end)}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            customInput={<CustomTimeInput />}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>

                    <Flex alignItems="center">
                      <Button mt={4} onClick={() => handleSubmit()}>
                        {label}
                      </Button>
                      {appointment.id && (
                        <Box mt={4} ml={4}>
                          <IconButton
                            aria-label="delete"
                            icon={<DeleteIcon />}
                            onClick={() => deleteAppointment(appointment.id)}
                            colorScheme="red"
                          />
                        </Box>
                      )}
                    </Flex>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
