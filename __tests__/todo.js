/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const todaydate = new Date();
    const todayDay = 86400000;
    [
      {
        title: "Preparation",
        completed: false,
        dueDate: new Date(todaydate.getTime() - todayDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Know your price and pay",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Completed",
        completed: false,
        dueDate: new Date(todaydate.getTime() + todayDay).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("creation of todo", () => {
    expect(all.length).toEqual(3);
    add({
      title: "Go have some bread",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("creation of todo completed", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("checking the retrieval", () => {
    expect(overdue().length).toEqual(1);
  });

  test("checking the retrieval of due today items from the given", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("checking the retrieval of due later items from the given", () => {
    expect(dueLater().length).toEqual(1);
  });
});
