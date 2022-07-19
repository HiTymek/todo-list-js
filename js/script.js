{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent.value },
        ];
        newTaskContent.value = "";
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
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const addFocus = () => {
        newTaskContent = document.querySelector(".js-newTask").focus();
    }

    const addEvents = () => {
        const removeTaskButtons = document.querySelectorAll(".js-removeTaskButton");
        removeTaskButtons.forEach((removeTaskButton, taskIndex) => {
            removeTaskButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleTaskDoneButtons = document.querySelectorAll(".js-toggleTaskDoneButton");
        toggleTaskDoneButtons.forEach((toggleTaskDoneButton, taskIndex) => {
            toggleTaskDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });

        const buttonElement = document.querySelector(".js-button");
        buttonElement.addEventListener("click", addFocus);
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasksList__item">
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

        addEvents();
    }

    const init = () => {
        render();

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

    init();

}
