import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isVoidExpression } from "typescript";
import { userCategoryArray } from "./atoms";

const Container = styled.div`
  width: 80%;
  text-align: center;
  margin: 0.5rem;
`;
const Title = styled.h3`
  font-size: 1.1rem;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 0.2rem 0;
  margin-bottom: 0.3rem;
  cursor: pointer;
`;

const Form = styled.form`
  padding: 0.2rem 0.3rem;
  background-color: white;
  border-radius: 1rem;
  input {
    border: none;
  }
  button {
    border: none;
    outline: none;
    background: transparent;
  }
`;

const CreateCategory = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [categoryArray, setCategoryArray] = useRecoilState(userCategoryArray);

  const createCategory = () => {
    setSubmitForm((prev) => !prev);
  };

  const submitCategory = ({ userCategory }: any) => {
    setCategoryArray((prev) => [
      ...prev,
      { userCategory: userCategory, id: Date.now() },
    ]);
    setValue("userCategory", "");
  };

  if (categoryArray?.length > 0) {
    localStorage.setItem("userCategories", JSON.stringify(categoryArray));
  }

  useEffect(() => {}, []);

  return (
    <Container>
      <Title onClick={createCategory}>Create Category</Title>
      {submitForm ? (
        <Form onSubmit={handleSubmit(submitCategory)}>
          <input
            {...register("userCategory")}
            type="text"
            placeholder="Make your category"
          />
          <button>Add</button>
        </Form>
      ) : null}
    </Container>
  );
};

export default CreateCategory;
