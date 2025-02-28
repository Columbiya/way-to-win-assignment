import { create } from "zustand";
import nurses from "../../mock/nurses.json";
import { Nurse } from "../../shared/types";

interface DoctorsState {
  nurses: Nurse[];
}

interface DoctorsActions {
  deleteNurse: (ids: number[]) => void;
  createNurse: (dto: Omit<Nurse, "id">) => void;
  editNurse: (dto: Nurse) => void;
}

export const useNursesStore = create<DoctorsState & DoctorsActions>((set) => ({
  nurses,
  deleteNurse(ids) {
    set((state) => ({
      nurses: state.nurses.filter((d) => !ids.includes(d.id)),
    }));
  },
  createNurse(dto) {
    set((state) => ({
      nurses: [...state.nurses, { id: Date.now(), ...dto }],
    }));
  },
  editNurse(dto) {
    set((state) => ({
      nurses: state.nurses.map((n) => {
        if (n.id === dto.id) {
          return {
            ...n,
            ...dto,
          };
        }

        return n;
      }),
    }));
  },
}));
