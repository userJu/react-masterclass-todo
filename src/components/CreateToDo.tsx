import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState, userCategoryState } from "./atoms";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.textColor};
  input {
    flex: 8;
    border: none;
  }
  button {
    flex: 2;
    border: none;
    outline: none;
    background: transparent;
    font-weight: 600;
    cursor: pointer;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const userCategory = useRecoilValue(userCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    if (toDos !== null) {
      setToDos((oldToDos) => [
        { text: toDo, id: Date.now(), category, userCategory },
        ...oldToDos,
      ]);
    } else if (toDos === null) {
      setToDos([{ text: toDo, id: Date.now(), category, userCategory }]);
    }

    setValue("toDo", "");
  };
  if (toDos?.length > 0) {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "Please Write a To Do" })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
    </Form>
  );
}

export default CreateToDo;
