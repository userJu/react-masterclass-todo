import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "NONE" = "",
}

export interface IToDo {
  text: string;
  id: number;
  userCategory: string | null;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const catagory = get(categoryState);

    if (catagory !== "") {
      return toDos?.filter((toDo) => toDo.category === catagory);
    }
  },
});

export const toDoUserSelector = selector({
  key: "toDoUserSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const userCategoryS = get(userCategoryState);

    if (userCategoryS !== "") {
      return toDos?.filter((toDo) => toDo.userCategory === userCategoryS);
    }
  },
});

// toDos.map((toDo) => {
//   if (toDo.category !== "") {
//     // console.log(toDo.category);
//     return toDos?.filter((toDo) => toDo.category === catagory);
//   } else if (toDo.userCategory !== "") {
//     // console.log(toDo.userCategory);
//     return toDos?.filter((toDo) => toDo.userCategory === userCategoryS);
//   }
// });

export interface ICategoryArray {
  userCategory: string;
  id: number;
}

export const userCategoryArray = atom<ICategoryArray[]>({
  key: "userCategoryArray",
  default: [],
});

export const userCategoryState = atom({
  key: "userCategory",
  default: "",
  // default: Categories.TO_DO,
});
