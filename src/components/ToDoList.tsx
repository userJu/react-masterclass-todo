import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryState,
  ICategoryArray,
  toDoSelector,
  toDoState,
  toDoUserSelector,
  userCategoryArray,
  userCategoryState,
} from "./atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  h1 {
    font-size: 1.5rem;
  }
  hr {
    width: 100%;
    margin: 1rem;
  }
`;

const CategoriesBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;
const Category = styled.button`
  outline: none;
  border: 1px solid white;
  border-radius: 1rem;
  font-size: 1rem;
  background-color: transparent;
  padding: 0.3rem 0.5rem;
  color: ${(prev) => prev.theme.textColor};
  cursor: pointer;
`;

// interface ICategoryArray {
//   userCategory: string | any;
//   id: number;
// }

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const userToDos = useRecoilValue(toDoUserSelector);
  const [categoryArray, setCategoryArray] = useRecoilState(userCategoryArray);
  const setToDoArray = useSetRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryState);
  const setUserCategory = useSetRecoilState(userCategoryState);
  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.value as any);
    setUserCategory(e.currentTarget.value as any);
    // console.log(e.currentTarget.value);
  };

  useEffect(() => {
    setToDoArray(JSON.parse(localStorage.getItem("toDos") as any));
    setCategoryArray(JSON.parse(localStorage.getItem("userCategories") as any));
  }, []);

  return (
    <Container>
      <h1>To Dos</h1>
      <hr />
      {/* <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select> */}
      <CategoriesBox>
        <Category type="submit" value={Categories.TO_DO} onClick={onClick}>
          To Do
        </Category>
        <Category type="submit" value={Categories.DOING} onClick={onClick}>
          Doing
        </Category>
        <Category type="submit" value={Categories.DONE} onClick={onClick}>
          Done
        </Category>
        {categoryArray?.map((category) => (
          <Category
            type="submit"
            key={category.id}
            value={category.userCategory}
            onClick={onClick}
          >
            {category.userCategory}
          </Category>
        ))}
      </CategoriesBox>
      <CreateCategory />
      <CreateToDo />
      {userToDos?.length === 0
        ? toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)
        : userToDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    </Container>
  );
}

export default ToDoList;

// interface IForm {
//   Email: string;
//   userName: string;
//   password1: string;
//   password2: string;
//   extraError?: string;
// }

// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       Email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password1 !== data.password2) {
//       return setError(
//         "password2",
//         { message: "password are not the same" },
//         { shouldFocus: true }
//       );
//       // setError("extraError", { message: "server offline." });
//     }
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onValid)}>
//         <input
//           {...register("Email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "only naver.com emails allowed",
//             },
//           })}
//           type="text"
//           placeholder="Email"
//         />
//         <span>{errors?.Email?.message}</span>
//         <input
//           {...register("userName", {
//             required: "write here",
//             validate: {
//               noNico: (value) => (value.includes("nico") ? "no nico" : true),
//               noNick: (value) =>
//                 value.includes("nick") ? "no nick too" : true,
//             },
//           })}
//           type="text"
//           placeholder="userName"
//         />
//         <span>{errors?.userName?.message}</span>
//         <input
//           {...register("password1", {
//             required: "password1 is required",
//           })}
//           type="text"
//           placeholder="password1"
//         />
//         <span>{errors?.password1?.message}</span>
//         <input
//           {...register("password2", {
//             required: "password2 is required",
//           })}
//           type="text"
//           placeholder="password2"
//         />
//         <span>{errors?.password2?.message}</span>

//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }
