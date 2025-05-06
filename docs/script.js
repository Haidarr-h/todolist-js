document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('#emptyImage');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }

    // if theres an added task
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        if(taskText.length > 30) {
            alert(`bruh, the task is too long brotha. Yours is ${taskText.length}`);
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" />
            <span class="task-text break-words max-w-sm w-full">${taskText}</span>
            <div class="task-buttons space-x-2 flex flex-row">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const taskTextSpan = li.querySelector('.task-text');
        const editButton = li.querySelector('.edit-btn');
        const deleteButton = li.querySelector('.delete-btn');

        // Checkbox toggle complete
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editButton.disabled = isChecked;
            editButton.style.opacity = isChecked ? '0.5' : '1';
            editButton.style.pointerEvents = isChecked ? 'none' : 'auto';
        });

        // Edit functionality
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit your task:', taskTextSpan.textContent);
            if (newText !== null) {
                taskTextSpan.textContent = newText.trim();
            }
        });

        // Delete functionality
        deleteButton.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });
});
