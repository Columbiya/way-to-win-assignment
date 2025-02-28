import {
  Button,
  FormControlLabel,
  Input,
  MenuItem,
  Modal,
  ModalProps,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { Doctor } from "../../../shared/types";
import { useEffect, useState } from "react";

interface DoctorModalProps extends Omit<ModalProps, "children"> {
  onConfirm: (dto: Doctor) => void;
  doctor?: Doctor;
  mode?: "create" | "edit";
}

export const DoctorModal = ({
  onConfirm,
  onClose,
  doctor: doctorPrev,
  mode = "create",
  ...props
}: DoctorModalProps) => {
  const [doctor, changeDoctor] = useState<Doctor>(doctorPrev ?? ({} as Doctor));

  useEffect(() => {
    if (doctorPrev) {
      changeDoctor(doctorPrev);
    }
  }, [doctorPrev]);

  const onChange = (key: keyof Doctor) => (value: Doctor[typeof key]) => {
    changeDoctor((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    // можно добавить валидацию для
    // отображения полей красным цветом
    if (!doctor.firstName || !doctor.lastName) {
      alert("Введите имя и фамилию");
      return;
    }

    onConfirm(doctor);
    closeModal();
  };

  const closeModal = () => {
    onClose?.({}, "backdropClick");
    if (mode === "create") {
      changeDoctor({} as Doctor);
    }
  };

  return (
    <Modal {...props} onClose={closeModal}>
      <Stack
        sx={{
          maxWidth: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          padding: 4,
          borderRadius: 4,
          gap: 4,
        }}
      >
        <Input
          placeholder="Фамилия"
          onChange={(e) => onChange("lastName")(e.target.value)}
          value={doctor.lastName}
        />
        <Input
          placeholder="Имя"
          onChange={(e) => onChange("firstName")(e.target.value)}
          value={doctor.firstName}
        />
        <Input
          placeholder="Отчество"
          onChange={(e) => onChange("patronymic")(e.target.value)}
          value={doctor.patronymic}
        />
        <Select
          onChange={(e) => onChange("branch")(e.target.value as string)}
          value={doctor.branch}
          label="Отделение"
        >
          <MenuItem value="surgeon">Хирургическое отделение</MenuItem>
          <MenuItem value="cardio">Кардиологическое отделение</MenuItem>
        </Select>
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => onChange("isHead")(e.target.checked)}
              value={doctor.isHead}
            />
          }
          label="Заведующий отделения"
        />
        <Button variant="outlined" onClick={onSubmit}>
          {mode === "create" ? "Создать" : "Редактировать"}
        </Button>
      </Stack>
    </Modal>
  );
};
