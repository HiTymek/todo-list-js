{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent.value },
        ];
        newTaskContent.value = "";
        addFocus();
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    }

    const markAllTasksAsDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    }

    const addFocus = () => {
        const buttonElement = document.querySelector(".js-button");
        buttonElement.addEventListener("click", addFocus);
        newTaskContent = document.querySelector(".js-newTask").focus();
    }

    const addRemoveEvents = () => {
        const removeTaskButtons = document.querySelectorAll(".js-removeTaskButton");
        removeTaskButtons.forEach((removeTaskButton, taskIndex) => {
            removeTaskButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    }

    const addToggleDoneEvents = () => {
        const toggleTaskDoneButtons = document.querySelectorAll(".js-toggleTaskDoneButton");
        toggleTaskDoneButtons.forEach((toggleTaskDoneButton, taskIndex) => {
            toggleTaskDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const addHeaderButtonsEvents = () => {
        const hideAllTasksDoneButton = document.querySelector(".js-hideAllTasksDoneButton");
        hideAllTasksDoneButton
            ? hideAllTasksDoneButton.addEventListener("click", () => {
                toggleHideDoneTasks();
            })
            : "";
        const markAllTasksAsDoneButton = document.querySelector(".js-markAllTasksAsDoneButton");
        markAllTasksAsDoneButton
            ? markAllTasksAsDoneButton.addEventListener("click", markAllTasksAsDone)
            : "";
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasksList__item ${hideDoneTasks && task.done ? "tasksList__item--hide" : ""}" >
            <button class="tasksList__button js-toggleTaskDoneButton">
            ${task.done ? "✔" : ""}
            </button>
            <span class=${task.done ? "tasksList__item--done" : ""}>
            ${task.content}
            </span>
            <button class="tasksList__button tasksList__button--red js-removeTaskButton">
            🗑
            </button>
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
    }

    const renderButtons = () => {
        let htmlHeaderButtons = "";

        tasks.length !== 0
            ? htmlHeaderButtons += `
        <button class="section__headerButton js-hideAllTasksDoneButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__headerButton js-markAllTasksAsDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `
            : "";

        document.querySelector(".js-headerButtons").innerHTML = htmlHeaderButtons;
    }

    const render = () => {
        renderTasks();
        renderButtons();

        addRemoveEvents();
        addToggleDoneEvents();
        addHeaderButtonsEvents();
    }

    const onFormSubmit = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const newTaskContent = document.querySelector(".js-newTask");
            if (newTaskContent.value.trim() === "") {
                return;
            }
            addNewTask(newTaskContent);
        });
    }

    const init = () => {
        render();

        onFormSubmit();
    }

    init();
}
