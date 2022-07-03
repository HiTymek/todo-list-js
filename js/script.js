{
    const tasks = [
        {
            content: "zjeść śniadanie",
            done: true,
        },
        {
            content: "pojechać na wakacje",
            done: false,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasksList__item ${task.done ? "tasksList__item--done" : ""}">
            <button class="js-removeTaskButton">Usuń</button>
            ${task.content}
            <button class="js-toggleTaskDoneButton">Zrobione</button>
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;

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
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const newTaskContent = document.querySelector(".js-newTask").value.trim();
            if (newTaskContent === "") {
                return;
            }
            addNewTask(newTaskContent);
        });

    };

    init();
}