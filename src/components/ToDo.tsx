import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState, Categories, userCategoryArray } from "./atoms";

// 1) fid to do based on id [2]

const LiContainer = styled.li`
  margin-top: 1rem;
  padding-bottom: 0.3rem;
  width: 80%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  align-items: center;
`;

const Buttons = styled.div``;
const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: ${(prop) => prop.theme.textColor};
  border: 1px solid white;
  border-radius: 1rem;
  margin-right: 0.3rem;
  padding: 0.2rem 0.4rem;
  transition: all 300ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: ${(prop) => prop.theme.accentColor};
  }
`;

function ToDo({ text, category, id, userCategory }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoState);
  const [categoryArray, setCategoryArray] = useRecoilState(userCategoryArray);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory, userCategory: "" };
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };

  const onUsersClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { textContent },
    } = e;

    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        text,
        id,
        category: Categories.NONE,
        userCategory: textContent,
      };
      const newToDos = [...prevToDos];
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };

  return (
    <LiContainer>
      <span>{text}</span>
      <Buttons>
        {category !== Categories.DOING && (
          <Button onClick={() => onClick(Categories.DOING)}>Doing</Button>
        )}
        {category !== Categories.TO_DO && (
          <Button onClick={() => onClick(Categories.TO_DO)}>To Do</Button>
        )}
        {category !== Categories.DONE && (
          <Button onClick={() => onClick(Categories.DONE)}>Done</Button>
        )}
        {categoryArray.map((category) => (
          <Button onClick={onUsersClick} key={category.id} value={category.id}>
            {category.userCategory}
          </Button>
        ))}

        {/* {category !== Categories.DOING && (
          <Button onClick={() => onClick(Categories.DOING)}>Doing</Button>
        )} */}
      </Buttons>
    </LiContainer>
  );
}
export default ToDo;
