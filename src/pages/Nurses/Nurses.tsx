import {
  Checkbox,
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
import { NurseModal } from "./components";
import { useNursesStore } from "../../entities/nurses/store";

export const NursesPage = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const nurses = useNursesStore((state) => state.nurses);
  const deleteNurse = useNursesStore((state) => state.deleteNurse);
  const createNurse = useNursesStore((state) => state.createNurse);
  const editNurse = useNursesStore((state) => state.editNurse);

  const [createNurseModalOpen, setCreateNurseModalOpen] = useState(false);
  const [editNurseModalOpen, setEditNurseModalOpen] = useState(false);

  const rowsCount = nurses.length;
  const selectedAtLeastOne = selected.length > 0;
  const selectedOnlyOne = selected.length === 1;

  const deleteSelectedNurses = () => {
    deleteNurse(selected);
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
                  : setSelected(nurses.map((d) => d.id))
              }
            />
          </TableCell>
          <TableCell>Фамилия</TableCell>
          <TableCell>Имя</TableCell>
          <TableCell>Отчество</TableCell>
          <TableCell>Отделение</TableCell>
        </TableHead>
        <TableBody>
          {nurses.map((d) => (
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
              <TableCell>{branchMap.get(d.branch)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!selectedAtLeastOne && (
        <Tooltip title="Добавить доктора">
          <IconButton
            onClick={() => setCreateNurseModalOpen(true)}
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
            <IconButton onClick={deleteSelectedNurses}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>

          {selectedOnlyOne && (
            <Tooltip title="Редактировать доктора">
              <IconButton onClick={() => setEditNurseModalOpen(true)}>
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      )}

      <NurseModal
        open={createNurseModalOpen}
        onClose={() => setCreateNurseModalOpen(false)}
        onConfirm={(nurse) => createNurse(nurse)}
      />

      <NurseModal
        open={editNurseModalOpen}
        onClose={() => setEditNurseModalOpen(false)}
        onConfirm={(nurse) => editNurse(nurse)}
        nurse={nurses.find((n) => n.id === selected[0])}
        mode="edit"
      />
    </>
  );
};
