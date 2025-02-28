import {
  Button,
  Input,
  MenuItem,
  Modal,
  ModalProps,
  Select,
  Stack,
} from "@mui/material";
import { Doctor, Nurse } from "../../../shared/types";
import { useEffect, useState } from "react";

interface NurseModalProps extends Omit<ModalProps, "children"> {
  onConfirm: (dto: Nurse) => void;
  nurse?: Nurse;
  mode?: "create" | "edit";
}

export const NurseModal = ({
  onConfirm,
  onClose,
  nurse: prevNurse,
  mode = "create",
  ...props
}: NurseModalProps) => {
  const [nurse, changeNurse] = useState<Nurse>(prevNurse ?? ({} as Nurse));

  useEffect(() => {
    if (prevNurse) {
      changeNurse(prevNurse);
    }
  }, [prevNurse]);

  const onChange = (key: keyof Nurse) => (value: Nurse[typeof key]) => {
    changeNurse((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    // можно добавить валидацию для
    // отображения полей красным цветом
    if (!nurse.firstName || !nurse.lastName) {
      alert("Введите имя и фамилию");
      return;
    }

    onConfirm(nurse);
    closeModal();
  };

  const closeModal = () => {
    onClose?.({}, "backdropClick");
    if (mode === "create") {
      changeNurse({} as Doctor);
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
          value={nurse.lastName}
        />
        <Input
          placeholder="Имя"
          onChange={(e) => onChange("firstName")(e.target.value)}
          value={nurse.firstName}
        />
        <Input
          placeholder="Отчество"
          onChange={(e) => onChange("patronymic")(e.target.value)}
          value={nurse.patronymic}
        />
        <Select
          onChange={(e) => onChange("branch")(e.target.value as string)}
          value={nurse.branch}
          label="Отделение"
        >
          <MenuItem value="surgeon">Хирургическое отделение</MenuItem>
          <MenuItem value="cardio">Кардиологическое отделение</MenuItem>
        </Select>
        <Button variant="outlined" onClick={onSubmit}>
          {mode === "create" ? "Создать" : "Редактировать"}
        </Button>
      </Stack>
    </Modal>
  );
};
