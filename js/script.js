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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-tasksList").innerHTML = htmlString;
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