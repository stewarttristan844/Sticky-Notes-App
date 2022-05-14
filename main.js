
const notes_Container = document.getElementById('app');
const add_Note_Button = notes_Container.querySelector(".add-note");

get_Notes().forEach(note => {
    const note_element = create_Note_Element(note.id, note.content);
    notes_Container.insertBefore(note_element, add_Note_Button);
});

add_Note_Button.addEventListener("click", () => add_Note());

function get_Notes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function save_Notes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function create_Note_Element(id, content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note"; //place holder for empty notes
    element.addEventListener("change", () => {
        update_Notes(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const deletion = confirm("Are you sure you want to delete this sticky note?");
        if (deletion) {
            delete_Note(id, element);
        }
    });

    return element
}

function add_Note() {
    const notes = get_Notes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const note_element = create_Note_Element(noteObj.id, noteObj.content);
    notes_Container.insertBefore(note_element, add_Note_Button);

    notes.push(noteObj);
    save_Notes(notes);
}

function update_Notes(id, newContent){
    const notes = get_Notes();
    const target_note = notes.filter(note => note.id == id)[0];

    target_note.content = newContent;
    save_Notes(notes);


}

function delete_Note(id, element){
    const notes = get_Notes().filter(note => note.id != id);

    save_Notes(notes);
    notes_Container.removeChild(element);
}