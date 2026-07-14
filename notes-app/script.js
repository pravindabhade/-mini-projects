const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");

// Load Notes
document.addEventListener("DOMContentLoaded", loadNotes);

// Add New Note
addBtn.addEventListener("click", () => {
    createNote("", getCurrentDate());
});

// Search Notes
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".note").forEach(note => {

        const text = note.querySelector("textarea").value.toLowerCase();

        note.style.display =
            text.includes(value) ? "flex" : "none";

    });
});

// Create Note
function createNote(text = "", date = getCurrentDate()) {

    const note = document.createElement("div");
    note.className = "note";

    note.innerHTML = `
        <textarea placeholder="Write your note...">${text}</textarea>

        <div class="note-footer">

            <span class="note-date">${date}</span>

            <button class="delete-btn">
                🗑️
            </button>

        </div>
    `;

    const textarea = note.querySelector("textarea");
    const deleteBtn = note.querySelector(".delete-btn");

    // Auto Save
    textarea.addEventListener("input", saveNotes);

    // Delete
    deleteBtn.addEventListener("click", () => {

        if(confirm("Delete this note?")){

            note.remove();
            saveNotes();

        }

    });

    notesContainer.appendChild(note);

    saveNotes();

}

// Save Notes
function saveNotes(){

    const notes = [];

    document.querySelectorAll(".note").forEach(note => {

        notes.push({

            text: note.querySelector("textarea").value,

            date: note.querySelector(".note-date").innerText

        });

    });

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}

// Load Notes
function loadNotes(){

    const notes =
    JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach(note => {

        createNote(note.text, note.date);

    });

}

// Current Date
function getCurrentDate(){

    const now = new Date();

    return now.toLocaleString("en-IN",{

        day:"2-digit",
        month:"short",
        year:"numeric",

        hour:"2-digit",
        minute:"2-digit"

    });

}