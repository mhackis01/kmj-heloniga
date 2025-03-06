import { tasks } from '../config/config.js';
import { sendDiscordMessage } from './discord.js';

// Function to update tasklist UI
export function updateTasklist() {
    const taskList = document.getElementById("task-list");
    if (!taskList) return;

    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        if (isTaskCompleted(task.id)) {
            taskElement.classList.add('completed');
        }

        const taskHeader = document.createElement('div');
        taskHeader.className = 'task-header';

        const checkbox = document.createElement('div');
        checkbox.className = 'task-checkbox';
        if (isTaskCompleted(task.id)) {
            checkbox.classList.add('checked');
        }
        checkbox.onclick = () => toggleTask(task.id);

        const title = document.createElement('div');
        title.className = 'task-title';
        title.textContent = task.title;
        title.onclick = () => toggleSubtasks(task.id);

        taskHeader.appendChild(checkbox);
        taskHeader.appendChild(title);
        taskElement.appendChild(taskHeader);

        const subtasksContainer = document.createElement('div');
        subtasksContainer.className = 'task-subtasks';
        subtasksContainer.id = `subtasks-${task.id}`;

        task.subtasks.forEach(subtask => {
            const subtaskElement = document.createElement('div');
            subtaskElement.className = 'subtask-item';
            if (subtask.completed) {
                subtaskElement.classList.add('completed');
            }

            const subtaskCheckbox = document.createElement('div');
            subtaskCheckbox.className = 'subtask-checkbox';
            if (subtask.completed) {
                subtaskCheckbox.classList.add('checked');
            }
            subtaskCheckbox.onclick = () => toggleSubtask(task.id, subtask.id);

            const subtaskTitle = document.createElement('div');
            subtaskTitle.textContent = subtask.title;

            subtaskElement.appendChild(subtaskCheckbox);
            subtaskElement.appendChild(subtaskTitle);
            subtasksContainer.appendChild(subtaskElement);
        });

        taskElement.appendChild(subtasksContainer);
        taskList.appendChild(taskElement);
    });
}

// Function to toggle task completion
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const isCompleted = isTaskCompleted(taskId);

    // Toggle all subtasks
    task.subtasks.forEach(subtask => {
        subtask.completed = !isCompleted;
    });

    // If task is being completed, send Discord message
    if (!isCompleted) {
        const message = `🎯 Task Completed: **${task.title}**\n` +
            task.subtasks.map(subtask => `✓ ${subtask.title}`).join('\n');
        sendDiscordMessage(message);
    }

    updateTasklist();
}

// Function to toggle subtask completion
function toggleSubtask(taskId, subtaskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const subtask = task.subtasks.find(s => s.id === subtaskId);
    if (!subtask) return;

    subtask.completed = !subtask.completed;

    // If all subtasks are completed, send Discord message
    if (isTaskCompleted(taskId)) {
        const message = `🎯 Task Completed: **${task.title}**\n` +
            task.subtasks.map(subtask => `✓ ${subtask.title}`).join('\n');
        sendDiscordMessage(message);
    }

    updateTasklist();
}

// Function to toggle subtasks visibility
export function toggleSubtasks(taskId) {
    const subtasksContainer = document.getElementById(`subtasks-${taskId}`);
    if (!subtasksContainer) return;

    subtasksContainer.classList.toggle('show');
}

// Function to check if a task is completed
function isTaskCompleted(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return false;
    return task.subtasks.every(subtask => subtask.completed);
} 