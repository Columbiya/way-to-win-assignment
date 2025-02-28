import { create } from "zustand";
import doctors from "../../mock/doctors.json";
import { Doctor } from "../../shared/types";

interface DoctorsState {
  doctors: Doctor[];
}

interface DoctorsActions {
  deleteDoctors: (ids: number[]) => void;
  createDoctor: (dto: Omit<Doctor, "id">) => void;
  editDoctor: (dto: Doctor) => void;
}

export const useDoctorsStore = create<DoctorsState & DoctorsActions>((set) => ({
  doctors,
  deleteDoctors(ids) {
    set((state) => ({
      doctors: state.doctors.filter((d) => !ids.includes(d.id)),
    }));
  },
  createDoctor(dto) {
    set((state) => ({
      doctors: [...state.doctors, { id: Date.now(), ...dto }],
    }));
  },
  editDoctor(dto) {
    set((state) => ({
      doctors: state.doctors.map((d) => {
        if (d.id === dto.id) {
          return {
            ...d,
            ...dto,
          };
        }

        return d;
      }),
    }));
  },
}));
