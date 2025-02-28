import {
  Checkbox,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { branchMap } from "../../shared/helpers";
import { useState } from "react";
import { useDoctorsStore } from "../../entities/doctors/store";
import { DoctorModal } from "./components";

export const DoctorsPage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const doctors = useDoctorsStore((state) => state.doctors);
  const deleteDoctors = useDoctorsStore((state) => state.deleteDoctors);
  const createDoctor = useDoctorsStore((state) => state.createDoctor);
  const editDoctor = useDoctorsStore((state) => state.editDoctor);

  const [createDoctorModalOpen, setCreateDoctorModalOpen] = useState(false);
  const [editDoctorModalOpen, setEditDoctorModalOpen] = useState(false);

  const rowsCount = doctors.length;
  const selectedAtLeastOne = selected.length > 0;
  const selectedOnlyOne = selected.length === 1;

  const deleteSelectedDoctors = () => {
    deleteDoctors(selected);
    setSelected([]);
  };

  if (rowsCount === 0) return null;

  return (
    <>
      <Table>
        <TableHead>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selected.length > 0 && rowsCount > selected.length}
              checked={rowsCount > 0 && rowsCount === selected.length}
              onChange={() =>
                selected.length === rowsCount
                  ? setSelected([])
                  : setSelected(doctors.map((d) => d.id))
              }
            />
          </TableCell>
          <TableCell>Фамилия</TableCell>
          <TableCell>Имя</TableCell>
          <TableCell>Отчество</TableCell>
          <TableCell>Отделение</TableCell>
        </TableHead>
        <TableBody>
          {doctors.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(d.id)}
                  onChange={() =>
                    setSelected((prev) =>
                      prev.includes(d.id)
                        ? prev.filter((id) => id !== d.id)
                        : prev.concat([d.id])
                    )
                  }
                />
              </TableCell>
              <TableCell>{d.lastName}</TableCell>
              <TableCell>{d.firstName}</TableCell>
              <TableCell>{d.patronymic}</TableCell>
              <TableCell>
                {branchMap.get(d.branch)}
                {d.isHead && (
                  <Chip label="Заведующий отделения" sx={{ marginLeft: 4 }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!selectedAtLeastOne && (
        <Tooltip title="Добавить доктора">
          <IconButton
            onClick={() => setCreateDoctorModalOpen(true)}
            sx={{ position: "fixed", bottom: 8, right: 8 }}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      {selectedAtLeastOne && (
        <Toolbar
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            bgcolor: (theme) => theme.palette.primary.main,
            justifyContent: "flex-end",
          }}
        >
          <Typography sx={{ color: "white" }}>
            Выбрано: {selected.length}
          </Typography>

          <Tooltip title="Удалить доктора">
            <IconButton onClick={deleteSelectedDoctors}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>

          {selectedOnlyOne && (
            <Tooltip title="Редактировать доктора">
              <IconButton onClick={() => setEditDoctorModalOpen(true)}>
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      )}

      <DoctorModal
        open={createDoctorModalOpen}
        onClose={() => setCreateDoctorModalOpen(false)}
        onConfirm={(doctor) => createDoctor(doctor)}
      />

      <DoctorModal
        open={editDoctorModalOpen}
        onClose={() => setEditDoctorModalOpen(false)}
        onConfirm={(doctor) => editDoctor(doctor)}
        doctor={doctors.find((d) => d.id === selected[0])}
        mode="edit"
      />
    </>
  );
};
